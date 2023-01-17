import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadComponent } from './pages/upload/upload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/stats',
    component: StatsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
