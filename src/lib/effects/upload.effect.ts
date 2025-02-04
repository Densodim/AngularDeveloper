import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {dataActions} from '../../store/data/data.actions';
import {catchError, mergeMap, switchMap} from "rxjs/operators"
import {MessageServiceComponent} from '../message-service/message-service.component';
import {EMPTY, from} from 'rxjs';
import {FileHistory} from '../../types/file.types';
import {fileActions} from '../../store/file/file.actions';

export const UploadEffect = createEffect(
  (actions$ = inject(Actions), message = inject(MessageServiceComponent)) => {
    return actions$.pipe(
      ofType(dataActions.uploadFile),
      switchMap(({file}: { file: File }) => {

        const reader = new FileReader()
        const fileReader$ = new Promise<string>((resolve, reject) => {
          reader.onload = () =>
            typeof reader.result === "string"
              ? resolve(reader.result)
              : reject("Error read file")
          reader.onerror = () => reject("Error upload file")
          reader.readAsText(file)
        })

        const result = from(fileReader$).pipe(
          mergeMap((result) => {
            const jsonData = JSON.parse(result)
            const fileHistory: FileHistory = {
              fileName: file.name,
              uploadDate: new Date(),
              jsonDate: jsonData,
            }

            message.showSuccess("File is successfully uploaded.")

            return [
              dataActions.setData({data: jsonData}),
              fileActions.addFileToHistory({file: fileHistory}),
            ]
          }),
          catchError(() => {
            message.showError("Error JSON");
            return EMPTY;
          })
        )
        return result;
      })
    )
  },
  {functional: true},
)
