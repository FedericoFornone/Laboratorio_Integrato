import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';

import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/dashboard/dashboard.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AboutComponent } from './pages/about/about.component';
import { ResponsiveSliderComponent } from './components/responsive-slider/responsive-slider.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    ButtonComponent,
    AvatarComponent,
    FooterComponent,
    AboutComponent,
    NavbarComponent,
    ResponsiveSliderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'it'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
