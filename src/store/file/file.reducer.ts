import { createFeature, createReducer, on, Store } from "@ngrx/store"
import { fileActions } from "./file.actions"
import { FileHistory, FileStateType } from "../../types/file.types"
import { inject } from "@angular/core"

const initialState: FileStateType = {
  history: [],
  selectedFileName: null,
}

export const fileReducer = createFeature({
  name: "File",
  reducer: createReducer(
    initialState,
    on(fileActions.addFileToHistory, (state, { file }) => {
      const updatedHistory = [file, ...state.history].slice(0, 5) // Оставляем только 5 последних файлов
      return { ...state, history: updatedHistory }
    }),
    on(fileActions.selectFileFromHistory, (state, { fileName }) => ({
      ...state,
      selectedFileName: fileName,
    })),
  ),
})

export const { selectHistory, selectSelectedFileName } = fileReducer

export function injectFileFeature() {
  const store = inject(Store)
  return {
    addFileToHistory: (file: FileHistory) => store.dispatch(fileActions.addFileToHistory({ file })),
    FileFromHistory: (fileName: string) => store.dispatch(fileActions.selectFileFromHistory({ fileName })),
    selectFileFromHistory: () => store.selectSignal(selectSelectedFileName),
    selectHistory: () => store.selectSignal(selectHistory),
  }
}
