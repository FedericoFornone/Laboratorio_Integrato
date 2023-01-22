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


  /**
   * Function that changes the language of the app and 
   * the attribute 'lang' of the html
   * @param {string} language, the string that indicates the language (ex: 'en', 'it') 
   */
  changeLanguage(language: string): void {
    //set the language
    this.translate.use(language);
    //change the 'lang' attribute
    document.documentElement.lang = language;
  }
}
