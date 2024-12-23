import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from './pessoa.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent,
  },
  {
    path: 'formulario',
    children: [
      {
        path: 'adicionar',
        component: PessoaFormComponent,
      },
      {
        path: 'editar/:idPessoa',
        component: PessoaFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoaRoutingModule {}
