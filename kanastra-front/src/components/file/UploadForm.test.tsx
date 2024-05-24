import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadForm from './UploadForm';
import { FileProvider, useFileContext } from '../FileContext';

jest.mock('../FileContext', () => {
  const originalModule = jest.requireActual('../FileContext');
  return {
    ...originalModule,
    useFileContext: jest.fn(),
  };
});

const mockDispatch = jest.fn();

beforeEach(() => {
  (useFileContext as jest.Mock).mockReturnValue({
    state: {
      uploading: false,
      error: null,
      file: null,
    },
    dispatch: mockDispatch,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders upload form and handles file upload', async () => {
  global.fetch = jest.fn().mockImplementation((url) => {
    if (url === 'http://localhost:8000/csrf-token') {
      return Promise.resolve({
        json: () => Promise.resolve({ csrfToken: 'fake-csrf-token' }),
      });
    } else if (url === 'http://localhost:8000/upload') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Boletos gerados e e-mails enviados com sucesso' }),
      });
    }
    return Promise.reject(new Error('Invalid URL'));
  });

  render(
    <FileProvider>
      <UploadForm />
    </FileProvider>
  );

  const fileInput = screen.getByLabelText(/upload file/i);
  const file = new File(['dummy content'], 'input2.csv', { type: 'text/csv' });

  fireEvent.change(fileInput, { target: { files: [file] } });

  const uploadButton = screen.getByText(/upload/i);
  fireEvent.click(uploadButton);

  await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPLOAD_FILE' }));

  await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({
    type: 'UPLOAD_FILE_SUCCESS',
    payload: { message: 'Boletos gerados e e-mails enviados com sucesso' },
  }));

  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalledWith('http://localhost:8000/csrf-token');
  expect(fetch).toHaveBeenCalledWith('http://localhost:8000/upload', expect.any(Object));
});

test('handles file upload error', async () => {
  global.fetch = jest.fn().mockImplementation((url) => {
    if (url === 'http://localhost:8000/csrf-token') {
      return Promise.resolve({
        json: () => Promise.resolve({ csrfToken: 'fake-csrf-token' }),
      });
    } else if (url === 'http://localhost:8000/upload') {
      return Promise.resolve({
        ok: false,
      });
    }
    return Promise.reject(new Error('Invalid URL'));
  });

  render(
    <FileProvider>
      <UploadForm />
    </FileProvider>
  );

  const fileInput = screen.getByLabelText(/upload file/i);
  const file = new File(['dummy content'], 'input2.csv', { type: 'text/csv' });

  fireEvent.change(fileInput, { target: { files: [file] } });

  const uploadButton = screen.getByText(/upload/i);
  fireEvent.click(uploadButton);

  await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPLOAD_FILE' }));

  await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith({
    type: 'UPLOAD_FILE_FAILURE',
    payload: 'Falhou a leitura do arquivo',
  }));

  expect(fetch).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalledWith('http://localhost:8000/csrf-token');
  expect(fetch).toHaveBeenCalledWith('http://localhost:8000/upload', expect.any(Object));
});
