import {createSelector} from '@ngrx/store';
import {dataFeature} from './data.reducer';


export const selectDataListPageViewModel = createSelector(
  dataFeature.selectData,
  dataFeature.selectLoading,
  (data, loading) => ({data, loading})
)

export const selectMinValue = createSelector(
  dataFeature.selectData,
  (data: any, loading: any) => ({data, loading})
)
