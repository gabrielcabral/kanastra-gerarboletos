import React, { useEffect } from 'react';
import { useFileContext } from './FileContext';

// Componente que lista os arquivos
const FileList: React.FC = () => {
  const { state, dispatch } = useFileContext(); // Hook para acessar o estado e dispatch do contexto

  // Função para buscar os arquivos do backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/files'); // Faz a requisição para obter a lista de arquivos
        const files = await response.json();
        dispatch({ type: 'SET_FILES', payload: files }); // Despacha a ação para definir os arquivos no estado
      } catch (error) {
        console.error('Erro ao buscar lista de arquivos:', error); // Loga um erro se ocorrer
      }
    };
    fetchFiles();
  }, [dispatch]); // O efeito depende do dispatch

  return (
    <div>
      <h2>Lista de Arquivos:</h2>
      {state.loading ? (
        <p>Carregando...</p> // Exibe mensagem de carregando se estiver no estado de loading
      ) : state.error ? (
        <p>Erro: {state.error}</p> // Exibe mensagem de erro se houver erro
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tamanho</th>
              <th>Tipo</th>
              <th>Data de Upload</th>
            </tr>
          </thead>
          <tbody>
            {state.files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.type}</td>
                <td>{file.uploadDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileList;
