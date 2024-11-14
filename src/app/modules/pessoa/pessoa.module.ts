import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PessoaComponent } from './pessoa.component';
import { SharedSigaeModule } from '../shared/shared.module';
import { PessoaRoutingModule } from './pessoa.routing.module';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { DadosContatoComponent } from './pessoa-form/dados-contato/dados-contato.component';
import { DadosEnderecoComponent } from './pessoa-form/dados-endereco/dados-endereco.component';
import { DadosCadastraisComponent } from './pessoa-form/dados-cadastrais/dados-cadastrais.component';

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedSigaeModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    StepperModule,
    ToastModule,
    CheckboxModule,
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    InputMaskModule,
    FormsModule,
    RippleModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PessoaComponent,
    PessoaFormComponent,
    DadosCadastraisComponent,
    DadosContatoComponent,
    DadosEnderecoComponent,
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PessoaModule {}
