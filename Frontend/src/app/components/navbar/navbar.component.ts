import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: '../navbar/navbar.component.html',
  styleUrls: ['../navbar/navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() themeChanged = new EventEmitter<boolean>();
  darkMode!: boolean;
  constructor(public router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    // gettin defaults from local storage
    this.translate.use(localStorage.getItem('language') || 'it');
    this.darkMode = localStorage.getItem('theme') === 'dark';
    this.themeChanged.emit(this.darkMode);
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
    localStorage.setItem('language', language);
    // dispatches an event so that we can catch it in other components to update the charts
    window.dispatchEvent(new Event('languageChanged'));
  }
  changeTheme() {
    this.darkMode = !this.darkMode;
    // keeping the theme permanent so it works on reload
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.themeChanged.emit(this.darkMode);
  }
}
