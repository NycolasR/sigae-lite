import { Component, OnDestroy, OnInit, output } from '@angular/core';
import { Objetivo } from '../../../shared/models/planoDeAcao/objetivo';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Problema } from '../../../shared/models/planoDeAcao/problema';
import { Acao } from '../../../shared/models/planoDeAcao/acao';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalAcoesComponent } from './modal-acoes/modal-acoes.component';
import { PlanoService } from '../../../shared/services/plano/plano.service';
import { PlanoDeAcao } from '../../../shared/models/planoDeAcao/planoDeAcao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problemas-acoes',
  templateUrl: './problemas-acoes.component.html',
  styleUrls: ['./problemas-acoes.component.scss'],
})
export class ProblemasAcoesComponent implements OnInit, OnDestroy {
  data: TreeNode[] = [];
  ref: DynamicDialogRef | undefined;

  objetivos: Objetivo[] = [];

  podeConcluir = output<boolean>();
  clicouBtnAnterior = output<boolean>();

  constructor(
    private readonly router: Router,
    private readonly planoService: PlanoService,
    private readonly dialogService: DialogService,
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

    this.data = this.convertObjetivosToTreeNodes(this.objetivos);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  abrirModalAcoes(idObjetivo: number, idProblema: number) {
    this.ref = this.dialogService.open(ModalAcoesComponent, {
      header: 'Criar ação',
      width: '50%',
      data: {
        idAcao: null,
        idProblema,
        idObjetivo,
      },
    });

    this.ref.onClose.subscribe((res: { houveAlteracao: boolean }) => {
      if (res.houveAlteracao) this.obterObjetivos();
    });
  }

  editarAcao(idObjetivo: number, idProblema: number, idAcao: number) {
    this.ref = this.dialogService.open(ModalAcoesComponent, {
      header: 'Editar ação',
      width: '50%',
      data: {
        idAcao,
        idProblema,
        idObjetivo,
      },
    });

    this.ref.onClose.subscribe((res: { houveAlteracao: boolean }) => {
      if (res.houveAlteracao) this.obterObjetivos();
    });
  }

  excluirAcao(idObjetivo: number, idProblema: number, idAcao: number) {
    this.planoService
      .excluirAcao(idObjetivo, idProblema, idAcao)
      .subscribe((res: boolean | undefined) => {
        if (!!res && res === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: 'Ação excluída com sucesso!',
          });
          this.obterObjetivos();
        }
      });
  }

  getNivel(rowNode: TreeNode): number {
    let nivel = 0;
    let currentNode = rowNode;

    while (currentNode.parent) {
      nivel++;
      currentNode = currentNode.parent;
    }

    return nivel;
  }

  private convertObjetivosToTreeNodes(objetivos: Objetivo[]): TreeNode[] {
    return objetivos.map((objetivo) => ({
      data: {
        descricao: objetivo.nome,
        etapa: null,
        responsavel: null,
        idObjetivo: objetivo.id,
      },
      children:
        objetivo.problemas?.map((problema) => ({
          data: {
            descricao: problema.descricaoProblema,
            etapa: problema.etapa?.descricao ?? '',
            responsavel: null,
            idObjetivo: objetivo.id,
            idProblema: problema.id,
          },
          children:
            problema.acoes?.map((acao) => ({
              data: {
                descricao: acao.descricao,
                etapa: problema.etapa?.descricao ?? '',
                responsavel: acao.responsavel?.nome ?? '',
                idObjetivo: objetivo.id,
                idProblema: problema.id,
                idAcao: acao.id,
              },
            })) ?? [],
        })) ?? [],
    }));
  }

  concluirPlanoDeAcao() {
    const existeProblemaSemAcao = this.objetivos.some((objetivo) =>
      objetivo.problemas.some(
        (problema) => !problema.acoes || problema.acoes.length === 0
      )
    );

    if (existeProblemaSemAcao) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Todos os problemas precisam ter ações salvas.',
      });
    } else {
      this.planoService
        .atualizarPlano({ cadastroFinalizado: true })
        .subscribe((res: PlanoDeAcao) => {
          if (res.cadastroFinalizado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Plano de ação concluído com sucesso!',
            });
            this.router.navigate(['/plano-de-acao']);
          }
        });
    }
  }
}
