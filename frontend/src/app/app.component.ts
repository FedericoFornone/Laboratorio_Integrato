import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  darkMode: boolean | undefined;

  updateTheme(darkMode: boolean) {
    this.darkMode = darkMode;
  }
}
