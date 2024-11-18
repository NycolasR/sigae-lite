import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
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
import { PlanoObjetivosComponent } from './plano-de-acao-etapas/plano-objetivos/plano-objetivos.component';
import { ProblemasAcoesComponent } from './plano-de-acao-etapas/problemas-acoes/problemas-acoes.component';
import { PlanoDeAcaoRoutingModule } from './plano-de-acao.routing.module';
import { ModalAcoesComponent } from './plano-de-acao-etapas/problemas-acoes/modal-acoes/modal-acoes.component';
import { ProblemasObjetivosComponent } from './plano-de-acao-etapas/descricao-objetivos/problemas-objetivos.component';
import { DadosProblemaComponent } from './plano-de-acao-etapas/descricao-objetivos/dados-problema/dados-problema.component';

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
    CarouselModule,
  ],
  declarations: [
    PlanoDeAcaoComponent,
    PlanoObjetivosComponent,
    ProblemasObjetivosComponent,
    ProblemasAcoesComponent,
    DadosProblemaComponent,
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
