import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './pessoa.component';
import { PessoaRoutingModule } from './pessoa.routing.module';
import { SharedSigaeModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
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
