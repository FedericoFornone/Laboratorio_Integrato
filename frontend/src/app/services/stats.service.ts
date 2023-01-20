import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiModel } from '../models/api.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { assembleUrl, reduceByDate } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getArrivals(
    region: string,
    date: string = '2021',
    infrastructure?: 'hotel' | 'other',
    residenceCountry?: 'italy' | 'foreign'
  ) {
    const url = assembleUrl(
      'statistics',
      region,
      date,
      infrastructure,
      residenceCountry
    );

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        const arrivals = reduceByDate(data, 'Arrivals');
        const labels: string[] = [...Object.keys(arrivals)];
        const values: any = [...Object.values(arrivals)];

        const barChartData: ChartConfiguration<'bar'>['data'] = {
          labels,
          datasets: [
            {
              data: values,
              label: 'Arrivi',
              backgroundColor: '#E70B67',
              borderRadius: 5,
            },
          ],
        };
        const barChartOptions: ChartOptions<'bar'> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Statistiche arrivi - ' + date,
              font: {
                size: 16,
              },
            },
          },
        };
        const barChartLegend = false;

        return {
          chartData: barChartData,
          options: barChartOptions,
          legend: barChartLegend,
        };
      })
    );
  }

  getAttendances(
    region: string,
    date: string = '2021',
    infrastructure?: 'hotel' | 'other',
    residenceCountry?: 'italy' | 'foreign'
  ) {
    const url = assembleUrl(
      'statistics',
      region,
      date,
      infrastructure,
      residenceCountry
    );

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        const attendances = reduceByDate(data, 'Attendance');
        const labels: string[] = [...Object.keys(attendances)];
        const values: any = [...Object.values(attendances)];

        const barChartData: ChartConfiguration<'bar'>['data'] = {
          labels,
          datasets: [
            {
              data: values,
              label: 'Presenze',
              backgroundColor: '#E70B67',
              borderRadius: 5,
            },
          ],
        };
        const barChartOptions: ChartOptions<'bar'> = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Statistiche presenze - ' + date,
              font: {
                size: 16,
              },
            },
          },
        };
        const barChartLegend = false;

        return {
          chartData: barChartData,
          options: barChartOptions,
          legend: barChartLegend,
        };
      })
    );
  }
}
