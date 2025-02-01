import {createFeature, createReducer, on} from '@ngrx/store';
import {FileHistory} from './file.model';
import {fileActions} from './file.actions';

interface State {
  history: FileHistory[];
  selectedFileName: string | null;
}

const initialState: State = {
  history: [],
  selectedFileName: null
};

export const fileReducer = createFeature({
  name: 'File',
  reducer: createReducer(
    initialState,
    on(fileActions.addFileToHistory, (state, {file}) => {
      const updatedHistory = [file, ...state.history].slice(0, 5); // Оставляем только 5 последних файлов
      return { ...state, history: updatedHistory};
    }),
    on(fileActions.selectFileFromHistory, (state, {fileName})=>({
      ...state,
      selectedFileName: fileName,
    }))
  )
})

export const { selectHistory, selectSelectedFileName } = fileReducer;

