import { Component, OnInit, output } from '@angular/core';

import { Objetivo } from '../../../shared/models/planoDeAcao/objetivo';
import { PlanoService } from '../../../shared/services/plano/plano.service';
import { PlanoDeAcao } from '../../../shared/models/planoDeAcao/planoDeAcao';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-descricao-objetivos',
  templateUrl: './descricao-objetivos.component.html',
  styleUrls: ['./descricao-objetivos.component.scss'],
})
export class DescricaoObjetivosComponent implements OnInit {
  objetivos: Objetivo[] = [];

  clicouBtnAnterior = output<boolean>();
  podeAvancar = output<true>();

  constructor(
    private readonly planoService: PlanoService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.obterObjetivos();
  }

  private obterObjetivos() {
    this.planoService.obterPlano().subscribe((res: PlanoDeAcao) => {
      this.objetivos = res.objetivos.filter(
        (objetivo: Objetivo) => objetivo.selecionado
      );
    });
  }

  avancarParaAcoes() {
    this.planoService.obterPlano().subscribe((res: PlanoDeAcao) => {
      const objetivosSelecionadoSemProblemas = res.objetivos.filter(
        (objetivo: Objetivo) =>
          objetivo.selecionado &&
          (!objetivo.problemas || objetivo.problemas.length === 0)
      );

      if (objetivosSelecionadoSemProblemas.length > 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: `Adicione pelo menos um problema aos objetivos selecionados para prosseguir.`,
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Problemas salvos com sucesso!`,
        });
        this.podeAvancar.emit(true);
      }
    });
  }
}
