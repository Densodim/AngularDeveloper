import { createActionGroup, props } from "@ngrx/store"

import {
  DataActionType,
  DataDirection,
  DataField,
} from "../../types/data.types"

// export const dataActions = {
//   setLoading: createAction('[Actin Data] Set Loading', props<{ data: DataActionType[] }>()),
//   setData: createAction('[Actin Data] Value', props<{ data: DataActionType[] }>()),
//   setMinValue: createAction('[Actin Data] Set Min Value', props<{ minValue: number }>()),
//   sortData: createAction('[Data] Sort Data', props<{ field: DataField; direction: DataDirection }>()),
// };

export const dataActions = createActionGroup({
  source: "DATA",
  events: {
    setLoading: props<{ data: DataActionType[] }>(),
    setData: props<{ data: DataActionType[] }>(),
    setMinValue: props<{ minValue: number }>(),
    sortData: props<{ field: DataField; direction: DataDirection }>(),
    uploadFile:props<{ file: File }>(),
  },
})
