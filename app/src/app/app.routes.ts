import { Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
  },
  {
      path: '',
      loadChildren: () =>
          import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
      path: '**',
      redirectTo: 'login',
  },
];
