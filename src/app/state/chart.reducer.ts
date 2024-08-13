import { Action, createReducer, on } from '@ngrx/store';
import { addChart, updateChart, removeChart } from './chart.actions';
import { Chart } from './chart.model';

export interface ChartState {
  charts: Chart[];
}

export const initialState: ChartState = {
  charts: []
};

export const _chartReducer = createReducer(
  initialState,
  on(addChart, (state, { chart }) => ({
    ...state,
    charts: [...state.charts, chart]
  })),
  on(updateChart, (state, { index, chart }) => {
    const updatedCharts = [...state.charts];
    updatedCharts[index] = chart;
    return {
      ...state,
      charts: updatedCharts
    };
  }),
  on(removeChart, (state, { index }) => ({
    ...state,
    charts: state.charts.filter((_, i) => i !== index)
  }))
);

export function chartReducer(state: ChartState | undefined, action: Action<string>) {
  return _chartReducer(state, action);
}