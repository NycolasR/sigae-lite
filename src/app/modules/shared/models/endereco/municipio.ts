import { Estado } from './estado';

export class Municipio {
  id: number;
  nome: string;
  estado: Estado;

  constructor(data: Partial<Entidade>) {
    this.id = data.id!;
    this.nome = data.nome!;
    this.estado = data.estado!;
  }
}
