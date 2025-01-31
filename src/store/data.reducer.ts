import {createFeature, createReducer, on} from '@ngrx/store';
import {actions} from "./data.actions";


export interface State {
  data: DataAction[];
  loading: boolean;
  minValue: number;
}

interface DataAction {
  category: string
  value: number
}

const initialState: State = {
  data: [],
  loading: false,
  minValue: 10
};


export const dataFeature = createFeature({
  name: 'Data',
  reducer: createReducer(
    initialState,
    on(actions.setLoading, (state) => ({
      ...state,
      loading: state.loading,
    })),
    // Загружаем данные
    on(actions.setData, (state, {data}) => ({
      ...state,
      data: [...data]
        .filter(el => el.value > state.minValue)   // Фильтрация по minValue
        .sort((a, b) => a.category.localeCompare(b.category)), // Сортировка по алфавиту
      loading: false
    })),
    on(actions.setMinValue, (state, {minValue}) => ({
      ...state,
      minValue,
      data: state.data.filter(el => el.value > minValue)
    }))
  )
})

export const {
  name,
  reducer,
  selectDataState,
  selectData,
  selectLoading
} = dataFeature
