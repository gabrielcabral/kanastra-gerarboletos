import React, { useState } from 'react';
import { useFileContext } from './FileContext';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { dispatch } = useFileContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_FILE' });

      const csrfResponse = await fetch('http://localhost:8000/csrf-token');
      const csrfData = await csrfResponse.json();

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': csrfData.csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error('Falhou a leitura do arquivo');
      }

      const uploadedFile = await response.json();
      dispatch({ type: 'UPLOAD_FILE_SUCCESS', payload: uploadedFile });
    } catch (error) {
      dispatch({ type: 'UPLOAD_FILE_FAILURE', payload: (error as Error).message });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
