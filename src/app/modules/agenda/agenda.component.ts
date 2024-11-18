import { Component, OnInit } from '@angular/core';
import { Evento } from '../shared/models/agenda/evento';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventoService } from './../shared/services/evento/evento.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  formCalendario: FormGroup = new FormGroup({});
  eventos!: Evento[];

  colunas = [
    {
      field: 'nome',
      header: 'Nome',
      width: 'width: 15rem',
    },
    {
      field: 'hora',
      header: 'Hora',
      width: 'width: 15rem',
    },
    {
      field: 'local',
      header: 'Local',
      width: 'width: 15rem',
    },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly eventoService: EventoService
  ) {}

  ngOnInit() {
    this.buildForm();

    this.eventoService
      .filtrarEventosPorDia(this.formCalendario.get('data')?.value)
      .subscribe((res: Evento[]) => {
        this.eventos = res;
      });

    this.formCalendario
      .get('data')
      ?.valueChanges.subscribe((novaData: Date | null) => {
        if (!!novaData) {
          this.eventoService
            .filtrarEventosPorDia(novaData)
            .subscribe((res: Evento[]) => {
              this.eventos = res;
            });
        }
      });
  }

  buildForm() {
    this.formCalendario = this.formBuilder.group({
      data: [new Date()],
    });
  }
}
