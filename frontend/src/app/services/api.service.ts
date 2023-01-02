// define angular service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return new Observable((observer) => {
      observer.next({
        lineChartData: {
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
        },
        lineChartOptions: {
          responsive: false,
        },
        lineChartLegend: true,
      });
    });
  }
}
