import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

import { PlanoDeAcaoComponent } from './plano-de-acao.component';
import { PlanoDeAcaoRoutingModule } from './plano-de-acao.routing.module';

@NgModule({
  imports: [
    CommonModule,
    PlanoDeAcaoRoutingModule,
    ButtonModule,
    StepperModule,
  ],
  declarations: [PlanoDeAcaoComponent],
})
export class PlanoDeAcaoModule {}
