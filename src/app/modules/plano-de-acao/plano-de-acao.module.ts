import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TreeTableModule } from 'primeng/treetable';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedSigaeModule } from '../shared/shared.module';
import { PlanoDeAcaoComponent } from './plano-de-acao.component';
import { DadosObjetivoComponent } from './plano-de-acao-etapas/descricao-objetivos/dados-objetivo/dados-objetivo.component';
import { PlanoObjetivosComponent } from './plano-de-acao-etapas/plano-objetivos/plano-objetivos.component';
import { ProblemasAcoesComponent } from './plano-de-acao-etapas/problemas-acoes/problemas-acoes.component';
import { PlanoDeAcaoRoutingModule } from './plano-de-acao.routing.module';
import { DescricaoObjetivosComponent } from './plano-de-acao-etapas/descricao-objetivos/descricao-objetivos.component';

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
    CheckboxModule,
    TreeTableModule,
  ],
  declarations: [
    PlanoDeAcaoComponent,
    PlanoObjetivosComponent,
    DescricaoObjetivosComponent,
    ProblemasAcoesComponent,
    DadosObjetivoComponent,
  ],
  providers: [MessageService],
})
export class PlanoDeAcaoModule {}
