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
    let url = `http://localhost:7790/statistics?region=${region}&date=${date}&dateType=monthly`;

    if (infrastructure) {
      url += '&infrastructure=' + infrastructure;
    }

    if (residenceCountry) {
      url += '&residenceCountry=' + residenceCountry;
    }

    return url;
  }

  private reduceByDate(data: ApiModel[]) {
    const reducedData = data.reduce((acc: any, item) => {
      const date = item.Date;
      const arrivals = item.Arrivals;

      if (acc[date]) {
        acc[date] += arrivals;
      } else {
        acc[date] = arrivals;
      }

      return acc;
    }, {});

    return reducedData;
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
        const arrivals = this.reduceByDate(data);
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
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Statistiche arrivi - ' + date,
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
