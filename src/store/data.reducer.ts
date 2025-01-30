import {createFeature, createReducer, on} from '@ngrx/store';
import {actions} from "./data.actions";


export interface State {
    data: DataAction[];
    loading: boolean;
}

interface DataAction {
    category: string
    value: number
}

const initialState: State = {
    data: [],
    loading: false,
};


export const dataFeature = createFeature({
    name: 'Data',
    reducer: createReducer(
        initialState,
        on(actions, (state, {data}) => ({...state, data, loading: false}))
    )
})

export const {
    name,
    reducer,
    selectDataState,
    selectData,
    selectLoading
} = dataFeature
