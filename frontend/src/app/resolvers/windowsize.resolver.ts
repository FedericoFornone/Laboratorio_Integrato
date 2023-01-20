import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeResolver implements Resolve<Observable<any>> {
  resolve() {
    return of(window.innerWidth);
  }
}
