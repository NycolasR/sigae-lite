import { Component, OnInit } from '@angular/core';
import { Objetivo } from '../../../shared/models/planoDeAcao/objetivo';
import { TreeNode } from 'primeng/api';
import { Problema } from '../../../shared/models/planoDeAcao/problema';
import { Acao } from '../../../shared/models/planoDeAcao/acao';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';

@Component({
  selector: 'app-problemas-acoes',
  templateUrl: './problemas-acoes.component.html',
  styleUrls: ['./problemas-acoes.component.scss'],
})
export class ProblemasAcoesComponent implements OnInit {
  data: TreeNode[] = [];

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
    console.log(this.data); // Verifique se as ações estão no lugar correto
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
                etapa: problema.etapa?.descricao ?? '-', // Herdar etapa do problema
                responsavel: acao.responsavel?.nome ?? '-', // Nome do responsável
              },
            })) ?? [], // Garante um array vazio se não houver ações
        })) ?? [], // Garante um array vazio se não houver problemas
    }));
  }
}
