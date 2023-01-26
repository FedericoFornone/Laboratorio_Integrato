import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  dataTheme: 'nomad-light' | 'nomad-dark' = 'nomad-light';

  updateTheme(event: boolean) {
    // avoiding expression has changed after it was checked error
    setTimeout(() => {
      this.dataTheme = event ? 'nomad-dark' : 'nomad-light';
    });
  }
}
