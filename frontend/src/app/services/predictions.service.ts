import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiModel } from '../models/api.model';
import { assembleUrl, reduceByDate, generateChartData } from './utils';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  constructor(private http: HttpClient) {}

  getArrivals(
    region: string,
    date: string = '2022',
    infrastructure?: '' | 'HOTELLIKE' | 'OTHER',
    residenceCountry?: '' | 'Italia' | 'Paesi esteri',
    covid: 'yes' | 'no' = 'no'
  ) {
    const url = assembleUrl(
      'predictions',
      region,
      date,
      infrastructure,
      residenceCountry,
      covid
    );

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        const arrivals = reduceByDate(data, 'Arrivals');
        const labels: string[] = [...Object.keys(arrivals)];
        const values: any = [...Object.values(arrivals)];

        return generateChartData(
          labels,
          values,
          'Previsioni arrivi - ' + date,
          'Arrivi'
        );
      })
    );
  }

  getAttendances(
    region: string,
    date: string = '2022',
    infrastructure?: '' | 'HOTELLIKE' | 'OTHER',
    residenceCountry?: '' | 'Italia' | 'Paesi esteri',
    covid: 'yes' | 'no' = 'no'
  ) {
    const url = assembleUrl(
      'predictions',
      region,
      date,
      infrastructure,
      residenceCountry,
      covid
    );

    console.log(url);

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        const attendances = reduceByDate(data, 'Attendance');
        const labels: string[] = [...Object.keys(attendances)];
        const values: any = [...Object.values(attendances)];

        return generateChartData(
          labels,
          values,
          'Previsioni presenze - ' + date,
          'Presenze'
        );
      })
    );
  }
}
