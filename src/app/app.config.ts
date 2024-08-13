import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {ChartService} from './chart.service';
import { Chart, reduce } from 'highcharts';
import { provideState, provideStore } from '@ngrx/store';
import { _chartReducer, initialState } from './state/chart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), ChartService, provideStore(),
    provideState({name: "charts", reducer: _chartReducer})] //,
  //] //, Chart
 //, Chart
};
