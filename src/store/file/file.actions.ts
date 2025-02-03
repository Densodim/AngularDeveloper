import { createActionGroup, props } from "@ngrx/store"

import { FileHistory } from "../../types/file.types"

// export const fileActions = {
//   addFileToHistory: createAction('[File] Add File to History', props<{ file: FileHistory }>()),
//   selectFileFromHistory: createAction('[File] Select File from History', props<{ fileName: string }>()),
// }

export const fileActions = createActionGroup({
  source: "FILE",
  events: {
    addFileToHistory: props<{ file: FileHistory }>(),
    selectFileFromHistory: props<{ fileName: string }>(),
  },
})
