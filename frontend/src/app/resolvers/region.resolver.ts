import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionResolver implements Resolve<Observable<any>> {
  /* making sure the data is available when the page first loads.
  A resolver for this is not really needed, but it avoids us waiting
  for it on page load */
  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const region = route.paramMap.get('region');
    return of(region);
  }
}
