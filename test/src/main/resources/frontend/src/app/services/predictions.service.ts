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

/* this service is in charge of calling the /predictions endpoint and getting the 
filtered data. The two functions are each used to get data about the arrivals and 
attendances */

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
        const labels: string[] = getMonths(arrivals);
        const values: any = [...Object.values(arrivals)];
        const title =
          getSelectedLanguage() === 'it'
            ? 'Previsioni arrivi - '
            : 'Arrivals predictions - ';
        const legend = getSelectedLanguage() === 'it' ? 'Arrivi' : 'Arrivals';

        return generateChartData(labels, values, title + date, legend);
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

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        const attendances = reduceByDate(data, 'Attendance');
        const labels: string[] = getMonths(attendances);
        const values: any = [...Object.values(attendances)];
        const title =
          getSelectedLanguage() === 'it'
            ? 'Previsioni presenze - '
            : 'Attendances predictions - ';
        const legend =
          getSelectedLanguage() === 'it' ? 'Presenze' : 'Attendances';

        return generateChartData(labels, values, title + date, legend);
      })
    );
  }
}
