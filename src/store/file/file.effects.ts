import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fileActions} from './file.actions';
import {map, withLatestFrom} from 'rxjs/operators';
import {dataActions} from '../data/data.actions';
import {selectHistory} from './file.reducer';


export const FileEffects = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(fileActions.selectFileFromHistory),
      withLatestFrom(store.select(selectHistory)), // Получаем историю файлов
      map(([action, history]) => {
        const selectedFile = history.find((file: { fileName: string; }) => file.fileName === action.fileName);

        // Проверяем, существует ли выбранный файл и содержит ли он jsonDate
        if (selectedFile && Array.isArray(selectedFile.jsonDate)) {
          return dataActions.setData({ data: selectedFile.jsonDate });
        } else {
          return { type: '[Data] Load Data Failed' };
        }
      })
    );
  },
  {functional: true}
);

