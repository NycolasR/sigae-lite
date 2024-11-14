import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlanoDeAcaoComponent } from './plano-de-acao.component';
import { PlanoDeAcaoRoutingModule } from './plano-de-acao.routing.module';
import { SharedSigaeModule } from '../shared/shared.module';
import { PlanoObjetivosComponent } from './plano-de-acao-etapas/plano-objetivos/plano-objetivos.component';
import { DescricaoObjetivosComponent } from './plano-de-acao-etapas/descricao-objetivos/descricao-objetivos.component';
import { ProblemasAcoesComponent } from './plano-de-acao-etapas/problemas-acoes/problemas-acoes.component';

@NgModule({
  imports: [
    CommonModule,
    PlanoDeAcaoRoutingModule,
    ButtonModule,
    StepperModule,
    SharedSigaeModule,
    TableModule,
    RippleModule,
    TooltipModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PlanoDeAcaoComponent,
    PlanoObjetivosComponent,
    DescricaoObjetivosComponent,
    ProblemasAcoesComponent,
  ],
})
export class PlanoDeAcaoModule {}
