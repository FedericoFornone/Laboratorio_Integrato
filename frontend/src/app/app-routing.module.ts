import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { StatsComponent } from './pages/dashboard/dashboard.component';
import { StatsResolver } from './resolvers/stats.resolver';
import { PredictionsResolver } from './resolvers/predictions.resolver';
import { WindowSizeResolver } from './resolvers/windowsize.resolver';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: StatsComponent,
    resolve: {
      stats: StatsResolver,
      predictions: PredictionsResolver,
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
