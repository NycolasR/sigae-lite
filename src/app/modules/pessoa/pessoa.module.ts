import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './pessoa.component';
import { PessoaRoutingModule } from './pessoa.routing.module';
import { SharedSigaeModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedSigaeModule,
    TableModule,
    PaginatorModule,
    TooltipModule,
  ],
  declarations: [PessoaComponent],
})
export class PessoaModule {}
