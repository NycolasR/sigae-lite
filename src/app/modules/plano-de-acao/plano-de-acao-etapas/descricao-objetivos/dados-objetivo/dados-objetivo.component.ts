import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Problema } from '../../../../shared/models/planoDeAcao/problema';
import { Etapa } from '../../../../shared/models/planoDeAcao/etapa';
import { Categoria } from '../../../../shared/models/planoDeAcao/categoria';

@Component({
  selector: 'app-dados-objetivo',
  templateUrl: './dados-objetivo.component.html',
  styleUrls: ['./dados-objetivo.component.scss'],
})
export class DadosObjetivoComponent implements OnInit {
  formProblema: FormGroup = new FormGroup({});

  problemas!: Problema[];

  etapas: string[] = ['Etapa A', 'Etapa B', 'Etapa C'];
  categorias: string[] = ['Categoria A', 'Categoria B', 'Categoria C'];
  prioridades: string[] = ['Prioridade A', 'Prioridade B', 'Prioridade C'];

  colunas = [
    {
      field: 'descricaoProblema',
      header: 'Descrição do problema',
      width: 'width: 20rem',
    },
    {
      field: 'etapa.descricao',
      header: 'Etapa',
      width: 'width: 15rem',
    },
    {
      field: 'possuiCausa',
      header: 'Possui causa',
      width: 'width: 10rem',
    },
    {
      field: 'resultado',
      header: 'Resultado',
      width: 'width: 15rem',
    },
    {
      field: 'prioridade',
      header: 'Prioridade',
      width: 'width: 10rem',
    },
    {
      field: 'categoria.descricao',
      header: 'Categoria',
      width: 'width: 15rem',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.buildForm();

    this.problemas = Array.from({ length: 25 }, (_, index) => {
      return new Problema({
        id: index + 1,
        descricaoProblema: `Descrição do problema ${index + 1}`,
        etapa: new Etapa({
          id: (index % 5) + 1,
          descricao: `Etapa ${(index % 5) + 1}`,
        }),
        possuiCausa: index % 2 === 0,
        resultado: `Resultado do problema ${index + 1}`,
        prioridade: index % 3 === 0,
        categoria: new Categoria({
          id: (index % 4) + 1,
          descricao: `Categoria ${(index % 4) + 1}`,
        }),
      });
    });
  }

  buildForm() {
    this.formProblema = this.formBuilder.group({
      descricaoProblema: [null, Validators.required],
      etapa: [null],
      possuiCausa: [false],
      resultado: [null],
      prioridade: [null, Validators.required],
      categoria: [null, Validators.required],
    });
  }

  salvarDadosObjetivo() {}
}
