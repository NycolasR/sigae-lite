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
  {
    path: 'pessoa',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/pessoa/pessoa.module').then((p) => p.PessoaModule),
  },
  {
    path: 'agenda',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/agenda/agenda.module').then((a) => a.AgendaModule),
  },
  {
    path: 'plano-de-acao',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./modules/plano-de-acao/plano-de-acao.module').then(
        (p) => p.PlanoDeAcaoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
