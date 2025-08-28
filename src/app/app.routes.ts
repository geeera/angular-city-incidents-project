import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },
  {
    path: 'incident/:id',
    loadComponent: () => import('./pages/incident-details/incident-details.component').then(c => c.IncidentDetailsComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
