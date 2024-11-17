import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlanoDeAcao } from '../../models/planoDeAcao/planoDeAcao';
import { Problema } from '../../models/planoDeAcao/problema';
import { Acao } from '../../models/planoDeAcao/acao';
import { Objetivo } from '../../models/planoDeAcao/objetivo';
@Injectable({
  providedIn: 'root',
})
export class PlanoService {
  private readonly localStorageKey = 'planoDeAcao';

  constructor() {}

  private getPlanoFromStorage(): PlanoDeAcao {
    const planoJSON = localStorage.getItem(this.localStorageKey);
    if (planoJSON) {
      return JSON.parse(planoJSON);
    }
    return this.criarEObterPlano();
  }

  private savePlanoToStorage(plano: PlanoDeAcao): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(plano));
  }

  private criarEObterPlano(): PlanoDeAcao {
    const novoPlano = new PlanoDeAcao({
      id: 1,
      cadastroFinalizado: false,
      objetivos: this.inicializarObjetivos(),
    });
    this.savePlanoToStorage(novoPlano);
    return novoPlano;
  }

  private inicializarObjetivos(): Objetivo[] {
    const objetivos: Objetivo[] = [];
    for (let i = 1; i <= 6; i++) {
      objetivos.push(new Objetivo({ id: i, nome: `Objetivo ${i}` }));
    }
    return objetivos;
  }

  criarPlano(): Observable<PlanoDeAcao> {
    const novoPlano = this.criarEObterPlano();
    return of(novoPlano);
  }

  obterPlano(): Observable<PlanoDeAcao> {
    const plano = this.getPlanoFromStorage();
    return of(plano);
  }

  atualizarPlano(
    planoAtualizado: Partial<PlanoDeAcao>
  ): Observable<PlanoDeAcao> {
    const planoExistente = this.getPlanoFromStorage();

    const planoAtualizadoCompleto = new PlanoDeAcao({
      ...planoExistente,
      ...planoAtualizado,
      objetivos: planoExistente.objetivos, // Mantém os objetivos existentes
    });

    this.savePlanoToStorage(planoAtualizadoCompleto);
    return of(planoAtualizadoCompleto);
  }

  excluirPlano(): Observable<boolean> {
    localStorage.removeItem(this.localStorageKey);
    return of(true);
  }

  // Métodos para Problemas
  adicionarProblema(
    idObjetivo: number,
    problema: Problema
  ): Observable<Problema> {
    const plano = this.getPlanoFromStorage();

    const objetivo = plano.objetivos.find((o) => o.id === idObjetivo);
    if (!objetivo) {
      throw new Error(`Objetivo com ID ${idObjetivo} não encontrado`);
    }

    objetivo.problemas = [...(objetivo.problemas || []), problema];
    this.savePlanoToStorage(plano);

    return of(problema);
  }

  atualizarProblema(
    idObjetivo: number,
    idProblema: number,
    dadosNovos: Partial<Problema>
  ): Observable<Problema> {
    const plano = this.getPlanoFromStorage();

    const objetivo = plano.objetivos.find((o) => o.id === idObjetivo);
    if (!objetivo) {
      throw new Error(`Objetivo com ID ${idObjetivo} não encontrado`);
    }

    const problemaIndex = objetivo.problemas?.findIndex(
      (p) => p.id === idProblema
    );
    if (problemaIndex === undefined || problemaIndex === -1) {
      throw new Error(
        `Problema com ID ${idProblema} não encontrado no Objetivo ${idObjetivo}`
      );
    }

    objetivo.problemas[problemaIndex] = new Problema({
      ...objetivo.problemas[problemaIndex],
      ...dadosNovos,
    });

    this.savePlanoToStorage(plano);
    return of(objetivo.problemas[problemaIndex]);
  }

  excluirProblema(idObjetivo: number, idProblema: number): Observable<boolean> {
    const plano = this.getPlanoFromStorage();

    const objetivo = plano.objetivos.find((o) => o.id === idObjetivo);
    if (!objetivo) {
      throw new Error(`Objetivo com ID ${idObjetivo} não encontrado`);
    }

    objetivo.problemas =
      objetivo.problemas?.filter((p) => p.id !== idProblema) || [];
    this.savePlanoToStorage(plano);

    return of(true);
  }

  // Métodos para Ações
  adicionarAcao(
    idObjetivo: number,
    idProblema: number,
    acao: Acao
  ): Observable<Acao> {
    const plano = this.getPlanoFromStorage();

    const objetivo = plano.objetivos.find((o) => o.id === idObjetivo);
    if (!objetivo) {
      throw new Error(`Objetivo com ID ${idObjetivo} não encontrado`);
    }

    const problema = objetivo.problemas?.find((p) => p.id === idProblema);
    if (!problema) {
      throw new Error(
        `Problema com ID ${idProblema} não encontrado no Objetivo ${idObjetivo}`
      );
    }

    problema.acoes = [...(problema.acoes || []), acao];
    this.savePlanoToStorage(plano);

    return of(acao);
  }

  atualizarAcao(
    idObjetivo: number,
    idProblema: number,
    idAcao: number,
    dadosNovos: Partial<Acao>
  ): Observable<Acao> {
    const plano = this.getPlanoFromStorage();

    const objetivo = plano.objetivos.find((o) => o.id === idObjetivo);
    if (!objetivo) {
      throw new Error(`Objetivo com ID ${idObjetivo} não encontrado`);
    }

    const problema = objetivo.problemas?.find((p) => p.id === idProblema);
    if (!problema) {
      throw new Error(
        `Problema com ID ${idProblema} não encontrado no Objetivo ${idObjetivo}`
      );
    }

    const acaoIndex = problema.acoes?.findIndex((a) => a.id === idAcao);
    if (acaoIndex === undefined || acaoIndex === -1) {
      throw new Error(
        `Ação com ID ${idAcao} não encontrada no Problema ${idProblema}`
      );
    }

    problema.acoes[acaoIndex] = new Acao({
      ...problema.acoes[acaoIndex],
      ...dadosNovos,
    });

    this.savePlanoToStorage(plano);
    return of(problema.acoes[acaoIndex]);
  }

  excluirAcao(
    idObjetivo: number,
    idProblema: number,
    idAcao: number
  ): Observable<boolean> {
    const plano = this.getPlanoFromStorage();

    const objetivo = plano.objetivos.find((o) => o.id === idObjetivo);
    if (!objetivo) {
      throw new Error(`Objetivo com ID ${idObjetivo} não encontrado`);
    }

    const problema = objetivo.problemas?.find((p) => p.id === idProblema);
    if (!problema) {
      throw new Error(
        `Problema com ID ${idProblema} não encontrado no Objetivo ${idObjetivo}`
      );
    }

    problema.acoes = problema.acoes?.filter((a) => a.id !== idAcao) || [];
    this.savePlanoToStorage(plano);

    return of(true);
  }
}
