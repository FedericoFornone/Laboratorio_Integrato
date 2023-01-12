import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getArrivals(
    data: any,
    region: string,
    residenceCountry: 'Italia' | 'Paesi esteri',
    infrastructure: 'HOTELLIKE' | 'OTHER'
  ): number[] {
    const regionData = data.filter((d: any) => d['Region'] === region);
    const tourists = regionData.filter(
      (d: any) =>
        d['ResidenceCountry'] === residenceCountry &&
        d['Infrastructure'] === infrastructure
    );

    const arrivals = tourists.map((d: any) => d['Arrivals']);
    return arrivals;
  }

  getStats(
    region: string = 'Abruzzo',
    infrastructure: string = '',
    residenceCountry: string = ''
  ): Observable<any> {
    return this.http.get('assets/abruzzo.json').pipe(
      map((data: any) => {
        const datasets = [];

        if (infrastructure === '' && residenceCountry === '') {
          datasets.push({
            label: 'Esteri in altre strutture',
            data: this.getArrivals(data, region, 'Paesi esteri', 'OTHER'),
            backgroundColor: '#0BE7A3',
            borderRadius: 5,
          });
          datasets.push({
            label: 'Esteri in hotel',
            data: this.getArrivals(data, region, 'Paesi esteri', 'HOTELLIKE'),
            backgroundColor: '#F2B705',
            borderRadius: 5,
          });
          datasets.push({
            label: 'Italiani in altre strutture',
            data: this.getArrivals(data, region, 'Italia', 'OTHER'),
            backgroundColor: '#0B7EE7',
            borderRadius: 5,
          });
          datasets.push({
            label: 'Italiani in hotel',
            data: this.getArrivals(data, region, 'Italia', 'HOTELLIKE'),
            backgroundColor: '#E70B67',
            borderRadius: 5,
          });
        }

        if (infrastructure === 'HOTELLIKE' && residenceCountry === 'Italia') {
          datasets.push({
            label: 'Italiani in hotel',
            data: this.getArrivals(data, region, 'Italia', 'HOTELLIKE'),
            backgroundColor: '#E70B67',
          });
        }

        if (infrastructure === 'OTHER' && residenceCountry === 'Italia') {
          datasets.push({
            label: 'Italiani in altre strutture',
            data: this.getArrivals(data, region, 'Italia', 'OTHER'),
            backgroundColor: '#0B7EE7',
          });
        }

        if (
          infrastructure === 'HOTELLIKE' &&
          residenceCountry === 'Paesi esteri'
        ) {
          datasets.push({
            label: 'Esteri in hotel',
            data: this.getArrivals(data, region, 'Paesi esteri', 'HOTELLIKE'),
            backgroundColor: '#F2B705',
          });
        }

        if (infrastructure === 'OTHER' && residenceCountry === 'Paesi esteri') {
          datasets.push({
            label: 'Esteri in altre strutture',
            data: this.getArrivals(data, region, 'Paesi esteri', 'OTHER'),
            backgroundColor: '#0BE7A3',
          });
        }

        return datasets;
      })
    );
  }
}
