import React, { createContext, useReducer, useContext } from 'react';

interface State {
  uploading: boolean;
  error: string | null;
  file: any;
}

interface Action {
  type: 'UPLOAD_FILE' | 'UPLOAD_FILE_SUCCESS' | 'UPLOAD_FILE_FAILURE';
  payload?: any;
}

const initialState: State = {
  uploading: false,
  error: null,
  file: null,
};

const FileContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({ state: initialState, dispatch: () => null });

const fileReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPLOAD_FILE':
      return { ...state, uploading: true, error: null };
    case 'UPLOAD_FILE_SUCCESS':
      return { ...state, uploading: false, file: action.payload };
    case 'UPLOAD_FILE_FAILURE':
      return { ...state, uploading: false, error: action.payload };
    default:
      return state;
  }
};

export const FileProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => useContext(FileContext);
