import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ArrivalStatsResolver } from './resolvers/arrivalstats.resolver';
import { AttendanceStatsResolver } from './resolvers/attendancestats.resolver';
import { RegionResolver } from './resolvers/region.resolver';
import { WindowSizeResolver } from './resolvers/windowsize.resolver';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
