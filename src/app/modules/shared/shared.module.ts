import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';

import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';
import { DadosContatoComponent } from './components/formulario/dados-contato/dados-contato.component';
import { DadosEnderecoComponent } from './components/formulario/dados-endereco/dados-endereco.component';
import { MensagemAlertaComponent } from './components/mensagem-alerta/mensagem-alerta.component';
import { DadosCadastraisComponent } from './components/formulario/dados-cadastrais/dados-cadastrais.component';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RippleModule,
    ReactiveFormsModule,
    CheckboxModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ToastModule,
    TooltipModule,
  ],
  exports: [
    MensagemAlertaComponent,
    TituloPaginaComponent,
    DadosCadastraisComponent,
    DadosContatoComponent,
    DadosEnderecoComponent,
  ],
  declarations: [
    MensagemAlertaComponent,
    TituloPaginaComponent,
    DadosCadastraisComponent,
    DadosContatoComponent,
    DadosEnderecoComponent,
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedSigaeModule {}
