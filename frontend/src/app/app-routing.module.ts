import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/dashboard/dashboard.component';
import { StatsResolver } from './resolvers/stats.resolver';
import { WindowSizeResolver } from './resolvers/windowsize.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: StatsComponent,
    resolve: { stats: StatsResolver, windowSize: WindowSizeResolver },
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
