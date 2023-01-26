import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StatsService } from '../services/stats.service';

@Injectable({
  providedIn: 'root',
})
export class ArrivalStatsResolver implements Resolve<Observable<any>> {
  constructor(private statsService: StatsService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const region = route.paramMap.get('region');
    const arrivals = this.statsService.getArrivals(region!);
    return arrivals;
  }
}
