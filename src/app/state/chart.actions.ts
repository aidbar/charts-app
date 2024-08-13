import { createAction, props } from '@ngrx/store';
import { Chart } from './chart.model';

export const addChart = createAction(
  '[Chart] Add Chart',
  props<{ chart: Chart }>()
);

export const updateChart = createAction(
  '[Chart] Update Chart',
  props<{ index: number, chart: Chart }>()
);

export const removeChart = createAction(
  '[Chart] Remove Chart',
  props<{ index: number }>()
);