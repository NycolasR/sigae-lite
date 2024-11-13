export class Estado {
  id: number;
  nome: string;
  sigla: string;
  siglaRegiao: string;

  constructor(data: Partial<Entidade>) {
    this.id = data.id!;
    this.nome = data.nome!;
    this.sigla = data.sigla!;
    this.siglaRegiao = data.siglaRegiao!;
  }
}
