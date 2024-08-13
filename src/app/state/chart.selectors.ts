import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Chart } from './chart.model';

export const selectCharts = createFeatureSelector<Chart[]>('charts');