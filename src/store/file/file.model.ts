import {DataAction} from '../data/data.reducer';

export interface FileHistory {
  fileName: string;
  uploadDate: Date;
  jsonDate: DataAction
}
