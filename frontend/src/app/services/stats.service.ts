import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiModel } from '../models/api.model';
import {
  assembleUrl,
  reduceByDate,
  generateChartData,
  getSelectedLanguage,
  getMonths,
} from './utils';

/* this service is in charge of calling the /statistics endpoint and getting the 
filtered data. The two functions are each used to get data about the arrivals and 
attendances */

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  getArrivals(
    region: string,
    date: string = '2021',
    infrastructure?: '' | 'HOTELLIKE' | 'OTHER',
    residenceCountry?: '' | 'Italia' | 'Paesi esteri'
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
        const labels: string[] = getMonths(arrivals);
        const values: any = [...Object.values(arrivals)];
        const title =
          getSelectedLanguage() === 'it'
            ? 'Statistiche arrivi - '
            : 'Arrivals statistics - ';
        const legend = getSelectedLanguage() === 'it' ? 'Arrivi' : 'Arrivals';

        return generateChartData(labels, values, title + date, legend);
      })
    );
  }

  getAttendances(
    region: string,
    date: string = '2021',
    infrastructure?: '' | 'HOTELLIKE' | 'OTHER',
    residenceCountry?: '' | 'Italia' | 'Paesi esteri'
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
        const labels: string[] = getMonths(attendances);
        const values: any = [...Object.values(attendances)];
        const title =
          getSelectedLanguage() === 'it'
            ? 'Statistiche presenze - '
            : 'Attendances statistics - ';
        const legend =
          getSelectedLanguage() === 'it' ? 'Presenze' : 'Attendances';

        return generateChartData(labels, values, title + date, legend);
      })
    );
  }
}
