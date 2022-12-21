import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';

import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/stats/stats.component';

import { StatsResolver } from './resolvers/stats.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'stats',
    component: StatsComponent,
    resolve: { stats: StatsResolver },
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
