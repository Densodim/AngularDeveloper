import {createAction, props} from '@ngrx/store';
import {FileHistory} from './file.model';

export const fileActions = {
  addFileToHistory: createAction('[File] Add File to History', props<{ file: FileHistory }>()),
  selectFileFromHistory:createAction('[File] Select File from History', props<{ fileName: string }>()),
}
