import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemAlertaComponent } from './components/mensagem-alerta/mensagem-alerta.component';

@NgModule({
  imports: [CommonModule],
  exports: [MensagemAlertaComponent],
  declarations: [MensagemAlertaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedSigaeModule {}
