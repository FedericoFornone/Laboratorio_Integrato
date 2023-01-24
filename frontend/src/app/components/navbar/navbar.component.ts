import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: '../navbar/navbar.component.html',
  styleUrls: ['../navbar/navbar.component.scss'],
})
export class NavbarComponent {
  @Output() themeChanged = new EventEmitter<boolean>();
  darkMode: boolean = false;
  constructor(public router: Router, private translate: TranslateService) {}

  ngOnInit():void {
    this.translate.use(localStorage.getItem("language") || "it");
  }


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
    localStorage.setItem("language", language);
  }
  changeTheme() {
    this.darkMode = !this.darkMode;
    this.themeChanged.emit(this.darkMode);
  }

}
