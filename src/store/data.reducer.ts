import {createFeature, createReducer, on} from '@ngrx/store';
import {actions} from "./data.actions";


export interface State {
  data: DataAction[];
  originalData: DataAction[];
  loading: boolean;
  minValue: number;
  sortBy: 'category' | 'value' | null;
  sortDirection: 'asc' | 'desc';
}

export interface DataAction {
  category: string
  value: number
}

const initialState: State = {
  data: [],
  originalData: [],
  loading: false,
  minValue: 10,
  sortBy: null,
  sortDirection: 'asc',
};

// Функция сортировки
const sortData = (data: DataAction[], field: 'category' | 'value', direction: 'asc' | 'desc') => {
  return [...data].sort((a, b) => {
    if (a[field] > b[field]) {
      return direction === 'asc' ? 1 : -1;
    } else if (a[field] < b[field]) {
      return direction === 'asc' ? -1 : 1;
    }
    return 0;
  });
};

// Фильтрация по `minValue`
const filterData = (data: DataAction[], minValue: number) => {
  return data.filter(item => item.value >= minValue);
};


export const dataFeature = createFeature({
  name: 'Data',
  reducer: createReducer(
    initialState,
    on(actions.setLoading, (state) => ({
      ...state,
      loading: true,
    })),
    // Загружаем данные
    on(actions.setData, (state, {data}) => {
      const filteredData = filterData(data, state.minValue);
      return {
        ...state,
        originalData: [...data],
        data: state.sortBy ? sortData(filteredData, state.sortBy, state.sortDirection) : filteredData,
        loading: false
      }
    }),// Устанавливаем данные и сортируем, если указано поле сортировки
    on(actions.setMinValue, (state, {minValue}) => {
      const filteredData = filterData(state.originalData, minValue);
      return {
        ...state,
        minValue,
        data: state.sortBy ? sortData(filteredData, state.sortBy, state.sortDirection) : filteredData,
      }
    }),
    on(actions.sortData, (state, {field, direction}) => ({
      ...state,
      sortBy: field,
      data: sortData(state.data, field, direction),
    }))   // Изменяем поле сортировки и сразу пересортировываем данные
  )
})

export const {
  name,
  reducer,
  selectDataState,
  selectData,
  selectLoading
} = dataFeature
