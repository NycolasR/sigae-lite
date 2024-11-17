import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormularioService } from '../../../../shared/services/formulario/formulario.service';
import { MessageService } from 'primeng/api';
import { PlanoService } from './../../../../shared/services/plano/plano.service';
import { PessoaService } from '../../../../shared/services/pessoa/pessoa.service';
import { Pessoa } from '../../../../shared/models/pessoa/pessoa';
import { Acao } from '../../../../shared/models/planoDeAcao/acao';

@Component({
  selector: 'app-modal-acoes',
  templateUrl: './modal-acoes.component.html',
  styleUrls: ['./modal-acoes.component.scss'],
})
export class ModalAcoesComponent implements OnInit {
  formModalAcoes: FormGroup = new FormGroup({});

  acao: Acao = new Acao({});

  pessoas: Pessoa[] = [];

  idAcao: number;
  idProblema: number;
  idObjetivo: number;

  fechouModal = output<boolean>();

  constructor(
    public config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly formBuilder: FormBuilder,
    private readonly planoService: PlanoService,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {
    this.idAcao = config.data.idAcao;
    this.idProblema = config.data.idProblema;
    this.idObjetivo = config.data.idObjetivo;
  }

  ngOnInit() {
    this.buildForm(null);

    this.pessoaService.listarPessoasCadastradas().subscribe((res: Pessoa[]) => {
      this.pessoas = res;
    });

    if (!!this.idAcao) {
      this.planoService
        .obterAcao(this.idProblema, this.idAcao)
        .subscribe((res: Acao | null) => {
          if (!!res) this.preencherForm(res);
        });
    }
  }

  preencherForm(acao: Acao): void {
    this.formModalAcoes.get('descricao')?.setValue(acao.descricao);
    this.formModalAcoes.get('responsavel')?.setValue(acao.responsavel);
  }

  buildForm(acao: Acao | null): void {
    this.formModalAcoes = this.formBuilder.group({
      descricao: [acao?.descricao ?? null, Validators.required],
      responsavel: [acao?.responsavel.nome ?? null, Validators.required],
    });
  }

  fechar(houveAlteracao: boolean = false) {
    this.ref.close({ houveAlteracao });
  }

  salvarDadosAcao() {
    if (this.formularioService.formularioIsValido(this.formModalAcoes)) {
      const salvarAcao = !!this.idAcao
        ? () =>
            this.planoService.atualizarAcao(
              this.idObjetivo,
              this.idProblema,
              this.idAcao,
              this.formModalAcoes.value
            )
        : () =>
            this.planoService.adicionarAcao(
              this.idObjetivo,
              this.idProblema,
              this.formModalAcoes.value
            );

      salvarAcao().subscribe((res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: `Dados de contato salvos com sucesso!`,
          });
          this.fechar(true);
        }
      });
    }
  }
}
