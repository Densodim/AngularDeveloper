import {createAction, props} from '@ngrx/store';
import {DataAction} from './data.reducer';

interface Action {
  type: '[Actin Data] Value'
}

export const dataActions = {
  setLoading: createAction('[Actin Data] Set Loading', props<{ data: DataAction[] }>()),
  setData: createAction('[Actin Data] Value', props<{ data: { category: string, value: number }[] }>()),
  setMinValue: createAction('[Actin Data] Set Min Value', props<{ minValue: number }>()),
  sortData: createAction('[Data] Sort Data', props<{ field: 'category' | 'value'; direction: 'asc' | 'desc' }>()),
};
