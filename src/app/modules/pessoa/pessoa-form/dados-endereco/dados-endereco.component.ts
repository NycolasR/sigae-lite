import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  MSG_FORMULARIO_INVALIDO,
  MSG_PREENCHIMENTO_INCORRETO,
} from '../../../shared/mensagens/mensagens';
import { validarCep } from '../../../shared/validadores/cep-validador';
import { EnderecoService } from '../../../shared/services/endereco/endereco.service';
import { Pais } from '../../../shared/models/endereco/pais';
import { Estado } from '../../../shared/models/endereco/estado';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { Cep } from '../../../shared/models/endereco/cep';
import { Municipio } from './../../../shared/models/endereco/municipio';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';
import { PessoaService } from '../../../shared/services/pessoa/pessoa.service';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';
import { Endereco } from './../../../shared/models/endereco/endereco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-endereco',
  templateUrl: './dados-endereco.component.html',
  styleUrls: ['./dados-endereco.component.scss'],
})
export class DadosEnderecoComponent implements OnInit {
  formDadosEndereco: FormGroup = new FormGroup({});

  pessoa: Pessoa = new Pessoa({});

  isPaisBrasil: boolean = false;

  paises: Pais[] = [];
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  clicouBtnAnterior = output<boolean>();

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly enderecoService: EnderecoService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.pessoaService.obterPessoaEmAndamento().subscribe((res: Pessoa) => {
      this.pessoa = res;
      this.buildForm(res.endereco ?? null);
    });

    this.consultarPaises();
    this.consultarEstados();

    this.formDadosEndereco
      .get('estado')
      ?.valueChanges.subscribe((estado: Estado) => {
        this.alterarEstadoCampoMunicipio(estado);
      });

    this.formDadosEndereco.get('cep')?.valueChanges.subscribe((cep: string) => {
      if (!this.formDadosEndereco.get('cep')?.invalid) {
        this.preencherCamposViaDadosCep(cep);
      }
    });

    this.formDadosEndereco.get('pais')?.valueChanges.subscribe((pais: Pais) => {
      this.tratarAlteracaoDePais(pais);
    });
  }

  private tratarAlteracaoDePais(pais: Pais) {
    this.isPaisBrasil = pais.name.common === 'Brazil';

    if (!this.isPaisBrasil) {
      this.formDadosEndereco.get('estado')?.setValue(null);
      this.formDadosEndereco.get('municipio')?.setValue(null);
      this.formDadosEndereco.get('municipio')?.enable();
    }
  }

  buildForm(endereco: Endereco | null): void {
    this.formDadosEndereco = this.formBuilder.group({
      enderecoCompleto: [endereco?.enderecoCompleto, Validators.required],
      cep: [endereco?.cep, validarCep()],
      pais: [endereco?.pais],
      estado: [endereco?.estado, Validators.required],
      municipio: [
        { value: endereco?.municipio, disabled: true },
        Validators.required,
      ],
    });
  }

  preencherCamposViaDadosCep(cep: string): void {
    this.enderecoService.consultarCep(cep).subscribe((res: Cep) => {
      this.setarPaisBrasil();
      this.preencherEndereco(res.logradouro);
      this.selecionarEstado(res.estado);
      this.selecionarMunicipio(res.localidade);
    });
  }

  private preencherEndereco(logradouro: string | undefined): void {
    if (logradouro) {
      this.formDadosEndereco.get('enderecoCompleto')?.setValue(logradouro);
    }
  }

  private selecionarEstado(nomeEstado: string | undefined): void {
    if (!nomeEstado) {
      return;
    }

    const estadoEncontrado = this.encontrarEstadoPorNome(nomeEstado);

    if (estadoEncontrado) {
      this.formDadosEndereco.get('estado')?.setValue(estadoEncontrado);
    }
  }

  private encontrarEstadoPorNome(nomeEstado: string): Estado | undefined {
    return this.estados.find(
      (estado: Estado) => estado.nome.toLowerCase() === nomeEstado.toLowerCase()
    );
  }

  private selecionarMunicipio(nomeMunicipio: string | undefined) {
    setTimeout(() => {
      if (!nomeMunicipio) {
        return;
      }
      const municipio = this.encontrarMunicipioPorNome(nomeMunicipio);

      if (municipio) {
        this.formDadosEndereco.get('municipio')?.setValue(municipio);
      }
    }, 300);
  }

  private encontrarMunicipioPorNome(
    nomeMunicipio: string
  ): Municipio | undefined {
    return this.municipios.find(
      (municipio: Municipio) =>
        municipio.nome.toLowerCase() === nomeMunicipio.toLowerCase()
    );
  }

  alterarEstadoCampoMunicipio(estado: Estado | null): void {
    if (estado) {
      this.formDadosEndereco.get('municipio')?.enable();
      this.carregarMunicipios(estado.id);
    } else {
      this.desabilitarCampoMunicipio();
    }
  }

  private desabilitarCampoMunicipio(): void {
    this.formDadosEndereco.get('municipio')?.disable();
    this.municipios = [];
  }

  private carregarMunicipios(estadoId: number): void {
    this.enderecoService.consultarMunicipios(estadoId).subscribe(
      (municipios) => {
        this.municipios = municipios;
      },
      (error) => {
        this.municipios = [];
      }
    );
  }

  consultarPaises(): void {
    this.enderecoService.consultarPaises().subscribe((res) => {
      this.paises = res;
      this.setarPaisBrasil();
    });
  }

  private setarPaisBrasil(): void {
    const paisBrasil = this.paises.find(
      (pais: Pais) => pais.name.common === 'Brazil'
    );

    this.formDadosEndereco.get('pais')?.setValue(paisBrasil);
  }

  consultarEstados(): void {
    this.enderecoService.consultarEstados().subscribe((res) => {
      this.estados = res;
    });
  }

  salvarDadosEndereco(): void {
    if (this.formularioService.formularioIsValido(this.formDadosEndereco)) {
      this.pessoaService
        .atualizarPessoaEmAndamento({ endereco: this.formDadosEndereco.value })
        .subscribe((res) => {
          if (!this.formDadosEndereco.pristine) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: `Dados do endereço salvos com sucesso!`,
            });
          }
          this.pessoaService
            .finalizarCadastroEmAndamento()
            .subscribe((res: Pessoa | null) => {
              this.router.navigate(['/pessoa']);
            });
        });
    }
  }
}
