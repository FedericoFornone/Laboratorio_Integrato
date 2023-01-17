import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ApiModel } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class StatsResolver implements Resolve<Observable<ApiModel>> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const region = route.paramMap.get('region');
    const stats = this.apiService.getStats(region!);
    return stats;
  }
}
