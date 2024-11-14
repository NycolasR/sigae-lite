import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PlanoDeAcaoComponent } from './plano-de-acao.component';

const routes: Routes = [
  {
    path: '',
    component: PlanoDeAcaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanoDeAcaoRoutingModule {}
