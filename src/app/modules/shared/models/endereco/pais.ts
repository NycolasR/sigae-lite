export class Pais {
  id: number;
  nome: string;
  ativo?: boolean;

  constructor(data: Partial<Entidade>) {
    this.id = data.id!;
    this.nome = data.nome!;
    this.ativo = data.ativo;
  }
}