import { Component, OnInit, output } from '@angular/core';

import { Objetivo } from '../../../shared/models/planoDeAcao/objetivo';
import { PlanoService } from '../../../shared/services/plano/plano.service';
import { PlanoDeAcao } from '../../../shared/models/planoDeAcao/planoDeAcao';

@Component({
  selector: 'app-descricao-objetivos',
  templateUrl: './descricao-objetivos.component.html',
  styleUrls: ['./descricao-objetivos.component.scss'],
})
export class DescricaoObjetivosComponent implements OnInit {
  objetivos: Objetivo[] = [];

  clicouBtnAnterior = output<boolean>();
  salvouProblemasDosObjetivos = output<Objetivo[]>();

  constructor(private readonly planoService: PlanoService) {}

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
}
