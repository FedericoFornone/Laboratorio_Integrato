import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiModel } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private assembleUrl(
    region: string,
    infrastructure?: 'hotel' | 'other',
    residenceCountry?: 'italy' | 'foreign',
    year?: string
  ) {
    let url = 'http://18.102.24.178:7790/statistics?region=' + region;

    if (infrastructure) {
      url += '&infrastructure=' + infrastructure;
    }

    if (residenceCountry) {
      url += '&residenceCountry=' + residenceCountry;
    }

    if (year) {
      url += '&year=' + year;
    }

    return url;
  }

  getStats(
    region: string,
    infrastructure?: 'hotel' | 'other',
    residenceCountry?: 'italy' | 'foreign',
    year?: string
  ) {
    const url = this.assembleUrl(
      region,
      infrastructure,
      residenceCountry,
      year
    );

    return this.http.get<ApiModel[]>(url).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
