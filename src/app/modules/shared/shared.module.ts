import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';
import { MensagemAlertaComponent } from './components/mensagem-alerta/mensagem-alerta.component';

@NgModule({
  imports: [CommonModule],
  exports: [MensagemAlertaComponent, TituloPaginaComponent],
  declarations: [MensagemAlertaComponent, TituloPaginaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedSigaeModule {}
