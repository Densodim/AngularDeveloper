import { createFeature, createReducer, on, Store } from "@ngrx/store"
import { dataActions } from "./data.actions"
import {
  DataActionType,
  DataDirection,
  DataField,
  StateDataType,
} from "../../types/data.types"
import { inject } from "@angular/core"

const initialState: StateDataType = {
  data: [],
  originalData: [],
  loading: false,
  minValue: 10,
  sortBy: null,
  sortDirection: "asc",
}

// Функция сортировки
const sortData = (
  data: DataActionType[],
  field: DataField,
  direction: DataDirection,
) => {
  return [...data].sort((a, b) => {
    if (a[field] > b[field]) {
      return direction === "asc" ? 1 : -1
    } else if (a[field] < b[field]) {
      return direction === "asc" ? -1 : 1
    }
    return 0
  })
}

// Фильтрация по `minValue`
const filterData = (data: DataActionType[], minValue: number) => {
  return data.filter((item) => item.value >= minValue)
}

export const dataReducer = createFeature({
  name: "Data",
  reducer: createReducer(
    initialState,
    on(dataActions.setLoading, (state) => ({
      ...state,
      loading: true,
    })),
    // Загружаем данные
    on(dataActions.setData, (state, { data }) => {
      const filteredData = filterData(data, state.minValue)
      return {
        ...state,
        originalData: [...data],
        data: state.sortBy
          ? sortData(filteredData, state.sortBy, state.sortDirection)
          : filteredData,
        loading: false,
      }
    }), // Устанавливаем данные и сортируем, если указано поле сортировки
    on(dataActions.setMinValue, (state, { minValue }) => {
      const filteredData = filterData(state.originalData, minValue)
      return {
        ...state,
        minValue,
        data: state.sortBy
          ? sortData(filteredData, state.sortBy, state.sortDirection)
          : filteredData,
      }
    }),
    on(dataActions.sortData, (state, { field, direction }) => ({
      ...state,
      sortBy: field,
      data: sortData(state.data, field, direction),
    })), // Изменяем поле сортировки и сразу пересортировываем данные
  ),
})

export const {
  name,
  reducer,
  selectDataState,
  selectData,
  selectLoading,
  selectMinValue,
  selectOriginalData,
} = dataReducer

export function injectDataFeature() {
  const store = inject<Store<{ data: StateDataType }>>(Store)
  return {
    setData: (data: DataActionType[]) =>
      store.dispatch(dataActions.setData({ data })),
    sortData: (field: DataField, direction: DataDirection) =>
      store.dispatch(dataActions.sortData({ field, direction })),
    setMinValue: (minValue: number) =>
      store.dispatch(dataActions.setMinValue({ minValue })),
    selectData: () => store.selectSignal(selectData),
    selectMinValue: () => store.selectSignal(selectMinValue),
  }
}
