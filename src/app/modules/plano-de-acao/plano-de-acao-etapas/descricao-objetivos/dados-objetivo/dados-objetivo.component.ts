import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { switchMap } from 'rxjs';

import { Etapa } from '../../../../shared/models/planoDeAcao/etapa';
import { Objetivo } from '../../../../shared/models/planoDeAcao/objetivo';
import { Problema } from '../../../../shared/models/planoDeAcao/problema';
import { Categoria } from '../../../../shared/models/planoDeAcao/categoria';
import { PlanoService } from '../../../../shared/services/plano/plano.service';
import { FormularioService } from '../../../../shared/services/formulario/formulario.service';
import { CategoriaService } from '../../../../shared/services/categoria/categoria.service';
import { EtapaService } from '../../../../shared/services/etapa/etapa.service';
import { PrioridadeEnum } from '../../../../shared/enum/prioridade-enum';

@Component({
  selector: 'app-dados-objetivo',
  templateUrl: './dados-objetivo.component.html',
  styleUrls: ['./dados-objetivo.component.scss'],
})
export class DadosObjetivoComponent implements OnInit {
  formProblema: FormGroup = new FormGroup({});
  objetivo: Objetivo = new Objetivo({});

  problemas: Problema[] = [];

  etapas: Etapa[] = [];
  categorias: Categoria[] = [];
  prioridades: { nome: string; value: PrioridadeEnum }[] = [];

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
    private readonly etapaService: EtapaService,
    private readonly messageService: MessageService,
    private readonly categoriaService: CategoriaService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.obterEtapas();
    this.obterCategorias();
    this.obterPrioridades();

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

  private obterEtapas() {
    this.etapaService.obterEtapas().subscribe((res: Etapa[]) => {
      this.etapas = res;
    });
  }

  private obterCategorias() {
    this.categoriaService.obterCategorias().subscribe((res: Categoria[]) => {
      this.categorias = res;
    });
  }

  private obterPrioridades() {
    this.prioridades = Object.values(PrioridadeEnum).map((value) => ({
      nome: value,
      value: value,
    }));
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
