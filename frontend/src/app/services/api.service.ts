import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiModel } from '../models/api.model';

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
    let url = `http://18.102.24.178:7790/statistics?region=${region}&date=${date}`;

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
        return data;
      })
    );
  }
}
