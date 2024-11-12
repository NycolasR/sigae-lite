import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/home/home.module').then((h) => h.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
