import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/stats.service';

@Injectable({
  providedIn: 'root',
})
export class ArrivalStatsResolver implements Resolve<Observable<any>> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const region = route.paramMap.get('region');
    const arrivals = this.apiService.getArrivals(region!);
    return arrivals;
  }
}
