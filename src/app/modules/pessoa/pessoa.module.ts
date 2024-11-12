import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './pessoa.component';
import { PessoaRoutingModule } from './pessoa.routing.module';
import { SharedSigaeModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, PessoaRoutingModule, SharedSigaeModule],
  declarations: [PessoaComponent],
})
export class PessoaModule {}
