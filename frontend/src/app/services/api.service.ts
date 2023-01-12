import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get('http://18.102.24.178:7790/statistics');
  }
}
