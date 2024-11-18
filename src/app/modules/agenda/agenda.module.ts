import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

import { AgendaComponent } from './agenda.component';
import { SharedSigaeModule } from '../shared/shared.module';
import { AgendaRoutingModule } from './agenda.routing.module';

@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    SharedSigaeModule,
    FormsModule,
    CalendarModule,
    TableModule,
    ReactiveFormsModule,
  ],
  declarations: [AgendaComponent],
})
export class AgendaModule {}
