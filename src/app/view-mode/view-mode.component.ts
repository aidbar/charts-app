// view-mode.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartService } from '../chart.service';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {RouterLink} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import { CommonModule } from '@angular/common';
import {HighchartsChartModule} from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { Chart } from '../state/chart.model';
import { Store } from '@ngrx/store';
import { addChart } from '../state/chart.actions';
import { selectCharts } from '../state/chart.selectors';

@Component({
  selector: 'app-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.css'],
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent
  ]
})
@Inject(ChartService)
export class ViewModeComponent implements OnInit {
  dateRangeForm: FormGroup;
  charts: any[] = [];
  Highcharts: typeof Highcharts = Highcharts;

  
  constructor(private fb: FormBuilder, private store: Store<{charts : Chart[]}>, private chartService: ChartService) {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });

    console.log(this.store);
    //this.store.addReducer('charts', (state = [], action) => { return state; });

    this.store.select('charts').subscribe(charts => {
      this.charts = charts;
      console.log('ViewModeComponent constructor charts: ' + this.charts);
      console.log(charts);
      console.log(this.charts);
    });

  }

  ngOnInit(): void {
    console.log('ViewModeComponent initialized, charts is: ' + this.charts);
    console.log(this.charts.length);
    console.log(typeof this.charts);
    if (this.charts.length == undefined) { 
      console.log('ViewModeComponent getChartData called');
      this.chartService.getChartData().subscribe(data => {
        console.log('ViewModeComponent getChartData data: ' + data);
        //mapChartData(this.charts, data);
        this.charts = data.map(chart => ({
          ...chart,
          options: getChartOptions(chart)
        }));
        console.log('ViewModeComponent getChartData charts after mapping: ' + this.charts);
        persistCharts(this.charts, this.store);
      });
  }


    console.log(this.charts);

    this.dateRangeForm.valueChanges.subscribe(value => {
      this.filterChartsByDateRange(value.start, value.end);
    });
  }


  filterChartsByDateRange(start: Date, end: Date): void {
    if (start && end) {
      this.charts = this.charts.filter(chart => {
        const chartDate = new Date(chart.date);
        return chartDate >= start && chartDate <= end;
      });
    }
  }
}

function getChartOptions(chart: any) : Highcharts.Options {
    return {
      title: { text: 'Sample Chart' },
      series: [{ 
        type: 'line',
        data: chart.value
      }]
    };
  }
function persistCharts(charts: any[], store: Store<{charts: Chart[]}>): void {
  for (let i = 0; i < charts.length; i++) {
    store.dispatch(addChart({chart: charts[i]}));
  }
}

function mapChartData(charts: any[], data: any[]): void {
    
    console.log("ViewModeComponent mapChartData charts: " + charts);
}

