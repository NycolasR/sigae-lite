import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Pessoa } from '../shared/models/pessoa/pessoa';
import { PessoaService } from '../shared/services/pessoa/pessoa.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
})
export class PessoaComponent implements OnInit {
  pessoas!: Pessoa[];

  colunas = [
    {
      field: 'nome',
      header: 'Nome',
      width: 'width: 15rem',
    },
    {
      field: 'cpf',
      header: 'CPF',
      width: 'width: 15rem',
    },
    {
      field: 'cnpj',
      header: 'CNPJ',
      width: 'width: 15rem',
    },
    {
      field: 'email',
      header: 'E-mail',
      width: 'width: 15rem',
    },
    {
      field: 'escola.nome',
      header: 'Escola',
      width: 'width: 15rem',
    },
    {
      field: 'endereco.municipio.nome',
      header: 'Endereço',
      width: 'width: 20rem',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    this.listarPessoasCadastradas();
  }

  listarPessoasCadastradas(): void {
    this.pessoaService.listarPessoasCadastradas().subscribe((res: Pessoa[]) => {
      this.pessoas = res;
    });
  }

  adicionarPessoa() {
    this.router.navigate(['/pessoa/formulario/adicionar']);
  }

  editarPessoa(idPessoa: number) {
    this.router.navigate([`/pessoa/formulario/editar/${idPessoa}`]);
  }

  excluirPessoa(idPessoa: number): void {
    this.pessoaService.excluir(idPessoa).subscribe((res: boolean) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: `Pessoa excluída com sucesso!`,
        });
        this.listarPessoasCadastradas();
      }
    });
  }
}
