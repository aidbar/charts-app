// settings.component.ts
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addChart, updateChart, removeChart } from '../state/chart.actions';
import { Chart } from '../state/chart.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogContent } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogContent,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent
  ]
})
export class SettingsComponent implements OnInit {
  @ViewChild('chartDialog')
  chartDialog!: TemplateRef<any>;
  chartForm: FormGroup;
  charts: Chart[] = [];
  isEditMode = false;
  editIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store<{ charts: Chart[] }>
  ) {
    this.chartForm = this.fb.group({
      name: ['', Validators.required],
      type: ['line', Validators.required],
      color: ['#000000', Validators.required]
    });

    this.store.select('charts').subscribe(charts => {
      this.charts = charts;
      console.log("settings charts: " + this.charts);
    });
  }

  ngOnInit(): void {}

  openModal(chart: Chart | null = null, index: number | null = null): void {
    this.isEditMode = !!chart;
    this.editIndex = index;

    if (chart) {
      this.chartForm.setValue({
        name: chart.name,
        type: chart.type,
        color: chart.color
      });
    } else {
      this.chartForm.reset({
        name: '',
        type: 'line',
        color: '#000000'
      });
    }

    this.dialog.open(this.chartDialog);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

  saveChart(): void {
    if (this.chartForm.valid) {
      const chartData = this.chartForm.value;

      if (this.isEditMode && this.editIndex !== null) {
        this.store.dispatch(updateChart({ index: this.editIndex, chart: chartData }));
      } else {
        this.store.dispatch(addChart({ chart: chartData }));
      }

      this.closeModal();
    }
  }

  removeChart(index: number): void {
    this.store.dispatch(removeChart({ index }));
  }
}