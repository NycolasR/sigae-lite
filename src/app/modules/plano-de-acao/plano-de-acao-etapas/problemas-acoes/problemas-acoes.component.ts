import { Component, OnDestroy, OnInit } from '@angular/core';
import { Objetivo } from '../../../shared/models/planoDeAcao/objetivo';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Problema } from '../../../shared/models/planoDeAcao/problema';
import { Acao } from '../../../shared/models/planoDeAcao/acao';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalAcoesComponent } from './modal-acoes/modal-acoes.component';

@Component({
  selector: 'app-problemas-acoes',
  templateUrl: './problemas-acoes.component.html',
  styleUrls: ['./problemas-acoes.component.scss'],
})
export class ProblemasAcoesComponent implements OnInit, OnDestroy {
  data: TreeNode[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit() {
    const objetivos: Objetivo[] = [
      new Objetivo({
        id: 1,
        nome: 'Melhorar processos internos',
        problemas: [
          new Problema({
            id: 1,
            descricaoProblema: 'Falta de treinamento',
            etapa: { id: 1, descricao: 'Planejamento' },
            acoes: [
              new Acao({
                id: 1,
                descricao: 'Treinar equipe',
                responsavel: new Pessoa({
                  id: 1,
                  nome: 'João Silva',
                  isPessoaJuridica: false,
                  email: 'joao.silva@example.com',
                  escola: { id: 1, nome: 'Escola XYZ' },
                }),
              }),
            ],
          }),
        ],
      }),
    ];

    this.data = this.convertObjetivosToTreeNodes(objetivos);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  abrirModalAcoes() {
    this.ref = this.dialogService.open(ModalAcoesComponent, {
      header: 'Criar ação',
      width: '50%',
      data: {
        idAcao: 1,
        idProblema: 2,
        idObjetivo: 3,
      },
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
      },
      children:
        objetivo.problemas?.map((problema) => ({
          data: {
            descricao: problema.descricaoProblema,
            etapa: problema.etapa?.descricao ?? '-',
            responsavel: null,
          },
          children:
            problema.acoes?.map((acao) => ({
              data: {
                descricao: acao.descricao,
                etapa: problema.etapa?.descricao ?? '-',
                responsavel: acao.responsavel?.nome ?? '-',
              },
            })) ?? [],
        })) ?? [],
    }));
  }
}
