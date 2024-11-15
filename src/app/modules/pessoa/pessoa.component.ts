import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Pessoa } from '../shared/models/pessoa/pessoa';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  animations: [
    trigger('overlayContentAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PessoaComponent implements OnInit {
  pessoas!: Pessoa[];

  colunas = [
    {
      field: 'nome',
      header: 'Nome',
      width: 'width: 15rem',
    },
    {
      field: 'cpf',
      header: 'CPF',
      width: 'width: 15rem',
    },
    {
      field: 'cnpj',
      header: 'CNPJ',
      width: 'width: 15rem',
    },
    {
      field: 'email',
      header: 'E-mail',
      width: 'width: 15rem',
    },
    {
      field: 'escola.nome',
      header: 'Escola',
      width: 'width: 15rem',
    },
    {
      field: 'endereco.municipio.nome',
      header: 'Endereço',
      width: 'width: 20rem',
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.pessoas = [
      {
        id: 1,
        nome: 'João Silva',
        nomeSocial: 'João',
        isPessoaJuridica: false,
        cpf: '123.456.789-00',
        cnpj: undefined,
        escola: { id: 1, nome: 'Escola Municipal A' },
        email: 'joao.silva@email.com',
        telefones: [{ id: 1, numero: '(11) 98765-4321' }],
        endereco: {
          id: 1,
          enderecoCompleto: 'Rua A, 123',
          cep: '12345-678',
          estado: { id: 1, nome: 'São Paulo', sigla: 'SP', siglaRegiao: 'SE' },
          municipio: {
            id: 1,
            nome: 'São Paulo',
            estado: {
              id: 1,
              nome: 'São Paulo',
              sigla: 'SP',
              siglaRegiao: 'SE',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 2,
        nome: 'Maria Oliveira',
        nomeSocial: 'Maria',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '12.345.678/0001-90',
        escola: { id: 2, nome: 'Escola Estadual B' },
        email: 'maria.oliveira@email.com',
        telefones: [{ id: 2, numero: '(21) 99876-5432' }],
        endereco: {
          id: 2,
          enderecoCompleto: 'Avenida B, 456',
          cep: '23456-789',
          estado: {
            id: 2,
            nome: 'Rio de Janeiro',
            sigla: 'RJ',
            siglaRegiao: 'SE',
          },
          municipio: {
            id: 2,
            nome: 'Rio de Janeiro',
            estado: {
              id: 2,
              nome: 'Rio de Janeiro',
              sigla: 'RJ',
              siglaRegiao: 'SE',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 3,
        nome: 'Carlos Santos',
        nomeSocial: 'Carlão',
        isPessoaJuridica: false,
        cpf: '987.654.321-00',
        cnpj: undefined,
        escola: { id: 3, nome: 'Colégio C' },
        email: 'carlos.santos@email.com',
        telefones: [{ id: 3, numero: '(31) 97654-3210' }],
        endereco: {
          id: 3,
          enderecoCompleto: 'Rua C, 789',
          cep: '34567-890',
          estado: {
            id: 3,
            nome: 'Minas Gerais',
            sigla: 'MG',
            siglaRegiao: 'SE',
          },
          municipio: {
            id: 3,
            nome: 'Belo Horizonte',
            estado: {
              id: 3,
              nome: 'Minas Gerais',
              sigla: 'MG',
              siglaRegiao: 'SE',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 4,
        nome: 'Ana Costa',
        nomeSocial: undefined,
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '98.765.432/0001-21',
        escola: { id: 4, nome: 'Instituto D' },
        email: 'ana.costa@email.com',
        telefones: [{ id: 4, numero: '(41) 96543-2109' }],
        endereco: {
          id: 4,
          enderecoCompleto: 'Avenida D, 101',
          cep: '45678-901',
          estado: { id: 4, nome: 'Paraná', sigla: 'PR', siglaRegiao: 'S' },
          municipio: {
            id: 4,
            nome: 'Curitiba',
            estado: { id: 4, nome: 'Paraná', sigla: 'PR', siglaRegiao: 'S' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 5,
        nome: 'Pedro Lima',
        nomeSocial: 'Pedrinho',
        isPessoaJuridica: false,
        cpf: '321.654.987-00',
        cnpj: undefined,
        escola: { id: 5, nome: 'Escola Técnica E' },
        email: 'pedro.lima@email.com',
        telefones: [{ id: 5, numero: '(51) 95432-1098' }],
        endereco: {
          id: 5,
          enderecoCompleto: 'Rua E, 202',
          cep: '56789-012',
          estado: {
            id: 5,
            nome: 'Rio Grande do Sul',
            sigla: 'RS',
            siglaRegiao: 'S',
          },
          municipio: {
            id: 5,
            nome: 'Porto Alegre',
            estado: {
              id: 5,
              nome: 'Rio Grande do Sul',
              sigla: 'RS',
              siglaRegiao: 'S',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 6,
        nome: 'Luciana Martins',
        nomeSocial: 'Luciana',
        isPessoaJuridica: false,
        cpf: '123.456.789-11',
        cnpj: undefined,
        escola: { id: 6, nome: 'Colégio F' },
        email: 'luciana.martins@email.com',
        telefones: [{ id: 6, numero: '(61) 92345-6789' }],
        endereco: {
          id: 6,
          enderecoCompleto: 'Rua F, 303',
          cep: '67890-123',
          estado: {
            id: 6,
            nome: 'Distrito Federal',
            sigla: 'DF',
            siglaRegiao: 'CO',
          },
          municipio: {
            id: 6,
            nome: 'Brasília',
            estado: {
              id: 6,
              nome: 'Distrito Federal',
              sigla: 'DF',
              siglaRegiao: 'CO',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 7,
        nome: 'Roberto Mendes',
        nomeSocial: 'Beto',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '99.888.777/0001-22',
        escola: { id: 7, nome: 'Escola G' },
        email: 'roberto.mendes@email.com',
        telefones: [{ id: 7, numero: '(62) 93456-7890' }],
        endereco: {
          id: 7,
          enderecoCompleto: 'Avenida G, 404',
          cep: '78901-234',
          estado: { id: 7, nome: 'Goiás', sigla: 'GO', siglaRegiao: 'CO' },
          municipio: {
            id: 7,
            nome: 'Goiânia',
            estado: { id: 7, nome: 'Goiás', sigla: 'GO', siglaRegiao: 'CO' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 8,
        nome: 'Fernanda Souza',
        nomeSocial: undefined,
        isPessoaJuridica: false,
        cpf: '987.654.321-22',
        cnpj: undefined,
        escola: { id: 8, nome: 'Instituto H' },
        email: 'fernanda.souza@email.com',
        telefones: [{ id: 8, numero: '(63) 91234-5678' }],
        endereco: {
          id: 8,
          enderecoCompleto: 'Rua H, 505',
          cep: '89012-345',
          estado: { id: 8, nome: 'Tocantins', sigla: 'TO', siglaRegiao: 'N' },
          municipio: {
            id: 8,
            nome: 'Palmas',
            estado: { id: 8, nome: 'Tocantins', sigla: 'TO', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 9,
        nome: 'Paulo Lima',
        nomeSocial: 'Paulão',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '12.345.678/0001-33',
        escola: { id: 9, nome: 'Escola I' },
        email: 'paulo.lima@email.com',
        telefones: [{ id: 9, numero: '(64) 92345-6789' }],
        endereco: {
          id: 9,
          enderecoCompleto: 'Avenida I, 606',
          cep: '90123-456',
          estado: {
            id: 9,
            nome: 'Mato Grosso',
            sigla: 'MT',
            siglaRegiao: 'CO',
          },
          municipio: {
            id: 9,
            nome: 'Cuiabá',
            estado: {
              id: 9,
              nome: 'Mato Grosso',
              sigla: 'MT',
              siglaRegiao: 'CO',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 10,
        nome: 'Carla Andrade',
        nomeSocial: 'Carlinha',
        isPessoaJuridica: false,
        cpf: '111.222.333-44',
        cnpj: undefined,
        escola: { id: 10, nome: 'Colégio J' },
        email: 'carla.andrade@email.com',
        telefones: [{ id: 10, numero: '(65) 93456-7890' }],
        endereco: {
          id: 10,
          enderecoCompleto: 'Rua J, 707',
          cep: '01234-567',
          estado: {
            id: 10,
            nome: 'Mato Grosso do Sul',
            sigla: 'MS',
            siglaRegiao: 'CO',
          },
          municipio: {
            id: 10,
            nome: 'Campo Grande',
            estado: {
              id: 10,
              nome: 'Mato Grosso do Sul',
              sigla: 'MS',
              siglaRegiao: 'CO',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 11,
        nome: 'Vinícius Borges',
        nomeSocial: undefined,
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '33.444.555/0001-44',
        escola: { id: 11, nome: 'Escola K' },
        email: 'vinicius.borges@email.com',
        telefones: [{ id: 11, numero: '(66) 94567-8901' }],
        endereco: {
          id: 11,
          enderecoCompleto: 'Avenida K, 808',
          cep: '12345-678',
          estado: { id: 11, nome: 'Amazonas', sigla: 'AM', siglaRegiao: 'N' },
          municipio: {
            id: 11,
            nome: 'Manaus',
            estado: { id: 11, nome: 'Amazonas', sigla: 'AM', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 12,
        nome: 'Juliana Brito',
        nomeSocial: 'Juju',
        isPessoaJuridica: false,
        cpf: '555.666.777-88',
        cnpj: undefined,
        escola: { id: 12, nome: 'Instituto L' },
        email: 'juliana.brito@email.com',
        telefones: [{ id: 12, numero: '(67) 95678-9012' }],
        endereco: {
          id: 12,
          enderecoCompleto: 'Rua L, 909',
          cep: '23456-789',
          estado: { id: 12, nome: 'Rondônia', sigla: 'RO', siglaRegiao: 'N' },
          municipio: {
            id: 12,
            nome: 'Porto Velho',
            estado: { id: 12, nome: 'Rondônia', sigla: 'RO', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 13,
        nome: 'Gabriel Silva',
        nomeSocial: 'Gabi',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '66.777.888/0001-55',
        escola: { id: 13, nome: 'Escola M' },
        email: 'gabriel.silva@email.com',
        telefones: [{ id: 13, numero: '(68) 96789-0123' }],
        endereco: {
          id: 13,
          enderecoCompleto: 'Avenida M, 1010',
          cep: '34567-890',
          estado: { id: 13, nome: 'Acre', sigla: 'AC', siglaRegiao: 'N' },
          municipio: {
            id: 13,
            nome: 'Rio Branco',
            estado: { id: 13, nome: 'Acre', sigla: 'AC', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 14,
        nome: 'Patrícia Gonçalves',
        nomeSocial: 'Patty',
        isPessoaJuridica: false,
        cpf: '888.999.000-11',
        cnpj: undefined,
        escola: { id: 14, nome: 'Colégio N' },
        email: 'patricia.goncalves@email.com',
        telefones: [{ id: 14, numero: '(69) 97890-1234' }],
        endereco: {
          id: 14,
          enderecoCompleto: 'Rua N, 1111',
          cep: '45678-901',
          estado: { id: 14, nome: 'Roraima', sigla: 'RR', siglaRegiao: 'N' },
          municipio: {
            id: 14,
            nome: 'Boa Vista',
            estado: { id: 14, nome: 'Roraima', sigla: 'RR', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 15,
        nome: 'Leonardo Lopes',
        nomeSocial: undefined,
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '22.333.444/0001-66',
        escola: { id: 15, nome: 'Escola O' },
        email: 'leonardo.lopes@email.com',
        telefones: [{ id: 15, numero: '(71) 98901-2345' }],
        endereco: {
          id: 15,
          enderecoCompleto: 'Avenida O, 1212',
          cep: '56789-012',
          estado: { id: 15, nome: 'Maranhão', sigla: 'MA', siglaRegiao: 'NE' },
          municipio: {
            id: 15,
            nome: 'São Luís',
            estado: {
              id: 15,
              nome: 'Maranhão',
              sigla: 'MA',
              siglaRegiao: 'NE',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 16,
        nome: 'Cláudia Ribeiro',
        nomeSocial: undefined,
        isPessoaJuridica: false,
        cpf: '112.223.334-55',
        cnpj: undefined,
        escola: { id: 16, nome: 'Instituto P' },
        email: 'claudia.ribeiro@email.com',
        telefones: [{ id: 16, numero: '(72) 99321-4567' }],
        endereco: {
          id: 16,
          enderecoCompleto: 'Rua P, 1313',
          cep: '67890-123',
          estado: { id: 16, nome: 'Ceará', sigla: 'CE', siglaRegiao: 'NE' },
          municipio: {
            id: 16,
            nome: 'Fortaleza',
            estado: { id: 16, nome: 'Ceará', sigla: 'CE', siglaRegiao: 'NE' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 17,
        nome: 'Rafael Fernandes',
        nomeSocial: 'Rafa',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '77.888.999/0001-77',
        escola: { id: 17, nome: 'Escola Q' },
        email: 'rafael.fernandes@email.com',
        telefones: [{ id: 17, numero: '(73) 90432-1234' }],
        endereco: {
          id: 17,
          enderecoCompleto: 'Avenida Q, 1414',
          cep: '78901-234',
          estado: { id: 17, nome: 'Paraíba', sigla: 'PB', siglaRegiao: 'NE' },
          municipio: {
            id: 17,
            nome: 'João Pessoa',
            estado: { id: 17, nome: 'Paraíba', sigla: 'PB', siglaRegiao: 'NE' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 18,
        nome: 'Daniela Costa',
        nomeSocial: 'Dani',
        isPessoaJuridica: false,
        cpf: '334.445.556-66',
        cnpj: undefined,
        escola: { id: 18, nome: 'Colégio R' },
        email: 'daniela.costa@email.com',
        telefones: [{ id: 18, numero: '(74) 91543-2345' }],
        endereco: {
          id: 18,
          enderecoCompleto: 'Rua R, 1515',
          cep: '89012-345',
          estado: {
            id: 18,
            nome: 'Pernambuco',
            sigla: 'PE',
            siglaRegiao: 'NE',
          },
          municipio: {
            id: 18,
            nome: 'Recife',
            estado: {
              id: 18,
              nome: 'Pernambuco',
              sigla: 'PE',
              siglaRegiao: 'NE',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 19,
        nome: 'Bruno Oliveira',
        nomeSocial: undefined,
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '99.101.112/0001-88',
        escola: { id: 19, nome: 'Escola S' },
        email: 'bruno.oliveira@email.com',
        telefones: [{ id: 19, numero: '(75) 92654-3456' }],
        endereco: {
          id: 19,
          enderecoCompleto: 'Avenida S, 1616',
          cep: '90123-456',
          estado: { id: 19, nome: 'Alagoas', sigla: 'AL', siglaRegiao: 'NE' },
          municipio: {
            id: 19,
            nome: 'Maceió',
            estado: { id: 19, nome: 'Alagoas', sigla: 'AL', siglaRegiao: 'NE' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 20,
        nome: 'Camila Martins',
        nomeSocial: 'Cami',
        isPessoaJuridica: false,
        cpf: '667.778.889-99',
        cnpj: undefined,
        escola: { id: 20, nome: 'Instituto T' },
        email: 'camila.martins@email.com',
        telefones: [{ id: 20, numero: '(76) 93765-4567' }],
        endereco: {
          id: 20,
          enderecoCompleto: 'Rua T, 1717',
          cep: '01234-567',
          estado: { id: 20, nome: 'Sergipe', sigla: 'SE', siglaRegiao: 'NE' },
          municipio: {
            id: 20,
            nome: 'Aracaju',
            estado: { id: 20, nome: 'Sergipe', sigla: 'SE', siglaRegiao: 'NE' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 21,
        nome: 'André Rocha',
        nomeSocial: 'Dedé',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '11.222.333/0001-99',
        escola: { id: 21, nome: 'Colégio U' },
        email: 'andre.rocha@email.com',
        telefones: [{ id: 21, numero: '(77) 94876-5678' }],
        endereco: {
          id: 21,
          enderecoCompleto: 'Avenida U, 1818',
          cep: '23456-789',
          estado: { id: 21, nome: 'Bahia', sigla: 'BA', siglaRegiao: 'NE' },
          municipio: {
            id: 21,
            nome: 'Salvador',
            estado: { id: 21, nome: 'Bahia', sigla: 'BA', siglaRegiao: 'NE' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 22,
        nome: 'Sandra Mota',
        nomeSocial: 'Sandy',
        isPessoaJuridica: false,
        cpf: '990.101.112-22',
        cnpj: undefined,
        escola: { id: 22, nome: 'Instituto V' },
        email: 'sandra.mota@email.com',
        telefones: [{ id: 22, numero: '(78) 95876-6789' }],
        endereco: {
          id: 22,
          enderecoCompleto: 'Rua V, 1919',
          cep: '34567-890',
          estado: { id: 22, nome: 'Pará', sigla: 'PA', siglaRegiao: 'N' },
          municipio: {
            id: 22,
            nome: 'Belém',
            estado: { id: 22, nome: 'Pará', sigla: 'PA', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 23,
        nome: 'Márcio Nogueira',
        nomeSocial: 'Marcinho',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '44.555.666/0001-11',
        escola: { id: 23, nome: 'Colégio X' },
        email: 'marcio.nogueira@email.com',
        telefones: [{ id: 23, numero: '(79) 96987-7890' }],
        endereco: {
          id: 23,
          enderecoCompleto: 'Avenida X, 2020',
          cep: '45678-901',
          estado: { id: 23, nome: 'Amapá', sigla: 'AP', siglaRegiao: 'N' },
          municipio: {
            id: 23,
            nome: 'Macapá',
            estado: { id: 23, nome: 'Amapá', sigla: 'AP', siglaRegiao: 'N' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 24,
        nome: 'Elisa Ramos',
        nomeSocial: 'Lili',
        isPessoaJuridica: false,
        cpf: '334.556.667-88',
        cnpj: undefined,
        escola: { id: 24, nome: 'Instituto Y' },
        email: 'elisa.ramos@email.com',
        telefones: [{ id: 24, numero: '(80) 97865-8901' }],
        endereco: {
          id: 24,
          enderecoCompleto: 'Rua Y, 2121',
          cep: '56789-012',
          estado: {
            id: 24,
            nome: 'Rio Grande do Norte',
            sigla: 'RN',
            siglaRegiao: 'NE',
          },
          municipio: {
            id: 24,
            nome: 'Natal',
            estado: {
              id: 24,
              nome: 'Rio Grande do Norte',
              sigla: 'RN',
              siglaRegiao: 'NE',
            },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
      {
        id: 25,
        nome: 'Tiago Almeida',
        nomeSocial: 'Titi',
        isPessoaJuridica: true,
        cpf: undefined,
        cnpj: '55.666.777/0001-22',
        escola: { id: 25, nome: 'Escola Z' },
        email: 'tiago.almeida@email.com',
        telefones: [{ id: 25, numero: '(81) 98987-9012' }],
        endereco: {
          id: 25,
          enderecoCompleto: 'Avenida Z, 2222',
          cep: '67890-123',
          estado: { id: 25, nome: 'Piauí', sigla: 'PI', siglaRegiao: 'NE' },
          municipio: {
            id: 25,
            nome: 'Teresina',
            estado: { id: 25, nome: 'Piauí', sigla: 'PI', siglaRegiao: 'NE' },
          },
          pais: { id: 1, nome: 'Brasil', ativo: true },
        },
      },
    ];
  }

  adicionarPessoa() {
    this.router.navigate(['/pessoa/adicionar']);
  }
}
