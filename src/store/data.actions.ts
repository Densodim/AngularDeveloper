import {createAction, props} from '@ngrx/store';

interface Action {
    type: '[Actin Data] Value'
    category: string
    value: number
}

export const actions = {
  setLoading: createAction('[Actin Data] Set Loading', props<{ data:{loading:boolean}}>()),
  setData:createAction('[Actin Data] Value', props<{ data:{category: string, value: number}[] }>()),
  setMinValue:createAction('[Actin Data] Set Min Value', props<{ minValue: number }>()),
};
