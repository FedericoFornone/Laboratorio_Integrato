//define resolver
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class PredictionsResolver implements Resolve<Observable<any>> {
  constructor(private apiService: ApiService) {}

  resolve() {
    return this.apiService.getPredictions();
  }
}
