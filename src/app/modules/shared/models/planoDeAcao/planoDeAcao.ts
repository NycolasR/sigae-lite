import { Objetivo } from './objetivo';

export class PlanoDeAcao {
  id: number;
  objetivos: Objetivo[];
  cadastroFinalizado: boolean;

  constructor(data: Partial<PlanoDeAcao>) {
    this.id = data.id!;
    this.objetivos = data.objetivos ?? [];
    this.cadastroFinalizado = data.cadastroFinalizado ?? false;
  }
}
