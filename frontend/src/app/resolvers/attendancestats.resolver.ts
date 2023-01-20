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
export class AttendanceStatsResolver implements Resolve<Observable<any>> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const region = route.paramMap.get('region');
    const attendances = this.apiService.getAttendances(region!);
    return attendances;
  }
}
