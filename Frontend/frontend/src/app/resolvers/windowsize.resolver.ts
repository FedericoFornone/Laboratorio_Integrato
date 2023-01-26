import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeResolver implements Resolve<Observable<any>> {
  /* using this so that the stats page knows immediatly if the graph
  to be displayed should be the mobile one or the desktop one, as the 
  listener in the stats page only works after the page has been resized */
  resolve() {
    return of(window.innerWidth);
  }
}
