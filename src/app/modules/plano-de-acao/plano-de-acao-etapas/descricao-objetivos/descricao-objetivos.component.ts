import { Component, OnInit } from '@angular/core';

import { Objetivo } from '../../../shared/models/planoDeAcao/objetivo';

@Component({
  selector: 'app-descricao-objetivos',
  templateUrl: './descricao-objetivos.component.html',
  styleUrls: ['./descricao-objetivos.component.scss'],
})
export class DescricaoObjetivosComponent implements OnInit {
  objetivos: Objetivo[] = [];

  constructor() {}

  ngOnInit() {}
}
