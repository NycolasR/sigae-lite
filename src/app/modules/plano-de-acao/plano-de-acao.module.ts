import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
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
import {
  DynamicDialogModule,
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { SharedSigaeModule } from '../shared/shared.module';
import { PlanoDeAcaoComponent } from './plano-de-acao.component';
import { DadosObjetivoComponent } from './plano-de-acao-etapas/descricao-objetivos/dados-objetivo/dados-objetivo.component';
import { PlanoObjetivosComponent } from './plano-de-acao-etapas/plano-objetivos/plano-objetivos.component';
import { ProblemasAcoesComponent } from './plano-de-acao-etapas/problemas-acoes/problemas-acoes.component';
import { PlanoDeAcaoRoutingModule } from './plano-de-acao.routing.module';
import { DescricaoObjetivosComponent } from './plano-de-acao-etapas/descricao-objetivos/descricao-objetivos.component';
import { ModalAcoesComponent } from './plano-de-acao-etapas/problemas-acoes/modal-acoes/modal-acoes.component';

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
    DialogModule,
    DynamicDialogModule,
  ],
  declarations: [
    PlanoDeAcaoComponent,
    PlanoObjetivosComponent,
    DescricaoObjetivosComponent,
    ProblemasAcoesComponent,
    DadosObjetivoComponent,
    ModalAcoesComponent,
  ],
  providers: [
    MessageService,
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
  ],
})
export class PlanoDeAcaoModule {}
