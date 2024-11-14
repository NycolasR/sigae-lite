import { Categoria } from './categoria';
import { Etapa } from './etapa';

export class Objetivo {
  id: number;
  descricaoProblema: string;
  etapa?: Etapa;
  possuiCausa?: boolean;
  resultado?: string;
  prioridade?: boolean;
  categoria?: Categoria;

  constructor(dados: Partial<Objetivo>) {
    this.id = dados.id ?? 0;
    this.descricaoProblema = dados.descricaoProblema ?? '';
    this.etapa = dados.etapa;
    this.possuiCausa = dados.possuiCausa ?? false;
    this.resultado = dados.resultado;
    this.prioridade = dados.prioridade ?? false;
    this.categoria = dados.categoria;
  }
}
