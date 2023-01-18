import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiModel } from '../models/api.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private assembleUrl(
    region: string,
    date: string,
    infrastructure?: 'hotel' | 'other',
    residenceCountry?: 'italy' | 'foreign'
  ) {
    let url = `http://localhost:7790/statistics?region=${region}&date=${date}`;

    if (infrastructure) {
      url += '&infrastructure=' + infrastructure;
    }

    if (residenceCountry) {
      url += '&residenceCountry=' + residenceCountry;
    }

    return url;
  }

  private getArrivals(data: ApiModel[]) {
    const arrivals = data.map((item) => {
      return item.Arrivals;
    });

    return arrivals;
  }

  getStats(
    region: string,
    date: string = '2021',
    infrastructure?: 'hotel' | 'other',
    residenceCountry?: 'italy' | 'foreign'
  ) {
    const url = this.assembleUrl(
      region,
      date,
      infrastructure,
      residenceCountry
    );

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        const arrivals = this.getArrivals(data);
        const lineChartData: ChartConfiguration<'line'>['data'] = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
          datasets: [
            {
              data: [65, 59, 80, 81, 56, 55, 40],
              label: 'Series A',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)',
            },
          ],
        };
        const lineChartOptions: ChartOptions<'line'> = {
          responsive: false,
        };
        const lineChartLegend = true;

        return {
          chartData: lineChartData,
          options: lineChartOptions,
          legend: lineChartLegend,
        };
      })
    );
  }
}
