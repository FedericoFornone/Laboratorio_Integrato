//resolver that returns the current window size in an SSR-friendly way:
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeResolver implements Resolve<number> {
  resolve(): Observable<number> {
    return of(window.innerWidth).pipe(map((width) => width));
  }
}
