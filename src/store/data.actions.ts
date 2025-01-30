import {createAction, props} from '@ngrx/store';

interface Action {
    type: '[Actin Data] Value'
    category: string
    value: number
}

export const actions = createAction(
    '[Actin Data] Value',
    props<{ data:{category: string, value: number}[] }>()
);
