import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-dados-endereco',
  templateUrl: './dados-endereco.component.html',
  styleUrls: ['./dados-endereco.component.scss'],
})
export class DadosEnderecoComponent implements OnInit {
  formDadosEndereco: FormGroup = new FormGroup({});

  isPaisBrasil: boolean = false;

  paises: Pais[] = [];
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly enderecoService: EnderecoService
  ) {}

  ngOnInit() {
    this.buildForm();
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
      this.isPaisBrasil = pais.name.common === 'Brazil';
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

  buildForm(): void {
    this.formDadosEndereco = this.formBuilder.group({
      enderecoCompleto: [null, Validators.required],
      cep: [null, validarCep()],
      pais: [null],
      estado: [null, Validators.required],
      municipio: [{ value: null, disabled: true }, Validators.required],
    });
  }

  salvarDadosEndereco(): void {
    if (this.formDadosEndereco.valid) {
      console.log(this.formDadosEndereco.value);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: MSG_FORMULARIO_INVALIDO,
        detail: MSG_PREENCHIMENTO_INCORRETO,
      });
    }
  }
}
