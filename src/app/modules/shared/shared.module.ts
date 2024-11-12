import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemAlertaComponent } from './components/mensagem-alerta/mensagem-alerta.component';
import { TituloPaginaComponent } from './components/titulo-pagina/titulo-pagina.component';

@NgModule({
  imports: [CommonModule],
  exports: [MensagemAlertaComponent, TituloPaginaComponent],
  declarations: [MensagemAlertaComponent, TituloPaginaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedSigaeModule {}
