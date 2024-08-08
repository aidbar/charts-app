// chart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private http: HttpClient) {}

  // Method to fetch chart data from a public API
  fetchChartData(): Observable<any[]> {
    const apiUrl = 'https://api.example.com/chart-data'; // Replace with a real API URL
    return this.http.get<any[]>(apiUrl).pipe(
      map(data => data.map(item => ({
        date: new Date(item.date),
        value: item.value
      })))
    );
  }

  // Method to generate random chart data
  generateRandomChartData(): Observable<any[]> {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Generate data for the last 30 days

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      //generate 5 random values for each day
      var values = [];
      for (let j = 0; j < 5; j++) {
        values.push(Math.floor(Math.random() * 100)); // Random value between 0 and 100
      }
      date.setDate(startDate.getDate() + i);
      data.push({
        date: date,
        value: values //Math.floor(Math.random() * 100) // Random value between 0 and 100
      });
    }

    return of(data);
  }

  // Method to get chart data (either fetch from API or generate randomly)
  getChartData(): Observable<any[]> {
    // Uncomment the following line to fetch data from an API
    // return this.fetchChartData();

    // Comment the following line if fetching data from an API
    return this.generateRandomChartData();
  }
}