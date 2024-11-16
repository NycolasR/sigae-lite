import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss'],
})
export class PessoaFormComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) {}

  idPessoa: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('idPessoa');
      if (id) {
        this.idPessoa = +id;
      }
    });
  }
}
