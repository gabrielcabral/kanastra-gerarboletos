import React from 'react';
import { FileProvider } from './file/FileContext';
import UploadForm from './file/UploadForm';
import FileList from './file/FileList';

import './../styles.css';
import './../global.css';




export function App() {
  return (
    <FileProvider>
      <div className="container">
        <UploadForm />
        <FileList />
      </div>
    </FileProvider>
  );
}
