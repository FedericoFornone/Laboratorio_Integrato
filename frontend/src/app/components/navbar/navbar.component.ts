import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: '../navbar/navbar.component.html',
  styleUrls: ['../navbar/navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public router: Router, private translate: TranslateService) {}

  changeLanguage(language: string): void {
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
