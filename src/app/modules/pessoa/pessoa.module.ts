import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';

import { PessoaComponent } from './pessoa.component';
import { SharedSigaeModule } from '../shared/shared.module';
import { PessoaRoutingModule } from './pessoa.routing.module';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedSigaeModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    StepperModule,
  ],
  declarations: [PessoaComponent, PessoaFormComponent],
})
export class PessoaModule {}
