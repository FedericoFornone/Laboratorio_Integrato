import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './pages/stats/stats.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AboutComponent } from './pages/about/about.component';
import { ResponsiveSliderComponent } from './components/responsive-slider/responsive-slider.component';
import { MultistepModalComponent } from './components/multistep-modal/multistep-modal.component';
import { UploadComponent } from './pages/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    StatsComponent,
    ButtonComponent,
    AvatarComponent,
    FooterComponent,
    AboutComponent,
    NavbarComponent,
    ResponsiveSliderComponent,
    MultistepModalComponent,
    UploadComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
