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

  
  constructor(private fb: FormBuilder, private chartService: ChartService) {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });
  }

  ngOnInit(): void {
    console.log('ViewModeComponent initialized');
    this.chartService.getChartData().subscribe(data => {
      this.charts = data.map(chart => ({
        ...chart,
        options: this.getChartOptions(chart)
      }));
    });

    console.log(this.charts);

    this.dateRangeForm.valueChanges.subscribe(value => {
      this.filterChartsByDateRange(value.start, value.end);
    });
  }
  getChartOptions(chart: any) : Highcharts.Options {
    return {
      title: { text: 'Sample Chart' },
      series: [{ 
        type: 'line',
        data: chart.value
      }]
    };
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