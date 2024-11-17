import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Etapa } from '../../../../shared/models/planoDeAcao/etapa';
import { Objetivo } from '../../../../shared/models/planoDeAcao/objetivo';
import { Problema } from '../../../../shared/models/planoDeAcao/problema';
import { Categoria } from '../../../../shared/models/planoDeAcao/categoria';
import { FormularioService } from '../../../../shared/services/formulario/formulario.service';
import { PlanoService } from '../../../../shared/services/plano/plano.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dados-objetivo',
  templateUrl: './dados-objetivo.component.html',
  styleUrls: ['./dados-objetivo.component.scss'],
})
export class DadosObjetivoComponent implements OnInit {
  formProblema: FormGroup = new FormGroup({});
  objetivo: Objetivo = new Objetivo({});

  problemas: Problema[] = [];

  etapas: string[] = ['Etapa A', 'Etapa B', 'Etapa C'];
  categorias: string[] = ['Categoria A', 'Categoria B', 'Categoria C'];
  prioridades: string[] = ['Prioridade A', 'Prioridade B', 'Prioridade C'];

  idObjetivo = input.required<number>();

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
      width: 'width: 15rem',
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
    private readonly formBuilder: FormBuilder,
    private readonly planoService: PlanoService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.planoService
      .obterObjetivoPorId(this.idObjetivo())
      .subscribe((res: Objetivo | undefined) => {
        if (!!res) {
          this.objetivo = res;
          this.problemas = res.problemas;
        }
      });
    this.buildForm();
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

  adicionarProblema() {
    if (this.formularioService.formularioIsValido(this.formProblema)) {
      this.planoService
        .adicionarProblema(this.idObjetivo(), this.formProblema.value)
        .pipe(
          switchMap(() =>
            this.planoService.obterObjetivoPorId(this.idObjetivo())
          )
        )
        .subscribe((res: Objetivo | undefined) => {
          if (!!res) {
            this.objetivo = res;
            this.problemas = res.problemas || [];
            this.formProblema.reset();
          }
        });
    }
  }
}
