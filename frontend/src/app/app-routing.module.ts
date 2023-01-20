import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadComponent } from './pages/upload/upload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ArrivalStatsResolver } from './resolvers/arrivalstats.resolver';
import { AttendanceStatsResolver } from './resolvers/attendancestats.resolver';
import { RegionResolver } from './resolvers/region.resolver';
import { WindowSizeResolver } from './resolvers/windowsize.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/stats/:region',
    component: StatsComponent,
    resolve: {
      arrivals: ArrivalStatsResolver,
      attendances: AttendanceStatsResolver,
      region: RegionResolver,
      windowSize: WindowSizeResolver,
    },
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
