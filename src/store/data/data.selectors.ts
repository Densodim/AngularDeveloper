import {createSelector} from '@ngrx/store';
import {dataReducer} from './data.reducer';


export const selectDataListPageViewModel = createSelector(
  dataReducer.selectData,
  dataReducer.selectLoading,
  (data, loading) => ({data, loading})
)

export const selectMinValue = createSelector(
  dataReducer.selectData,
  (data: any, loading: any) => ({data, loading})
)
