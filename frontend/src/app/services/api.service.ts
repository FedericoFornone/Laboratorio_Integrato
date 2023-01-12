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
    return this.http.get('localhost:8080/statistics');
  }
}
