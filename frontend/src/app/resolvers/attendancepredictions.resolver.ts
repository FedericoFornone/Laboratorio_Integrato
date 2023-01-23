import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PredictionsService } from '../services/predictions.service';

@Injectable({
  providedIn: 'root',
})
export class AttendancePredictionsResolver implements Resolve<Observable<any>> {
  constructor(private predictionsService: PredictionsService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const region = route.paramMap.get('region');
    const arrivals = this.predictionsService.getAttendances(region!);
    return arrivals;
  }
}
