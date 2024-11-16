import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  validarCNPJ,
  validarCPF,
} from '../../../shared/validadores/documento-validador';
import {
  MSG_FORMULARIO_INVALIDO,
  MSG_PREENCHIMENTO_INCORRETO,
} from '../../../shared/mensagens/mensagens';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';
import { PessoaService } from '../../../shared/services/pessoa/pessoa.service';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.scss'],
})
export class DadosCadastraisComponent implements OnInit {
  formDadosCadastrais: FormGroup = new FormGroup({});

  pessoa: Pessoa = new Pessoa({});

  escolas: string[] = ['Escola A', 'Escola B', 'Escola C'];

  criouNovaPessoa = output<Pessoa>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.pessoaService.obterPessoaEmAndamento().subscribe((res: Pessoa) => {
      this.pessoa = res;
      this.buildForm(res);
    });

    this.formDadosCadastrais
      .get('isPessoaJuridica')
      ?.valueChanges.subscribe((isJuridica: boolean) => {
        this.alternarCamposCpfCanpj(isJuridica);
      });
  }

  private alternarCamposCpfCanpj(isJuridica: boolean) {
    if (isJuridica) {
      console.log('entrei aq');
      this.formDadosCadastrais.get('cpf')?.clearValidators();
      this.formDadosCadastrais.get('cpf')?.setValue(null);
      this.formDadosCadastrais.get('cnpj')?.setValidators([validarCNPJ()]);
    } else {
      this.formDadosCadastrais.get('cnpj')?.clearValidators();
      this.formDadosCadastrais.get('cnpj')?.setValue(null);
      this.formDadosCadastrais.get('cpf')?.setValidators([validarCPF()]);
    }

    this.formDadosCadastrais.get('cpf')?.updateValueAndValidity();
    this.formDadosCadastrais.get('cnpj')?.updateValueAndValidity();
  }

  buildForm(pessoa: Pessoa) {
    this.formDadosCadastrais = this.formBuilder.group({
      nome: [pessoa.nome, Validators.required],
      nomeSocial: [pessoa.nomeSocial],
      isPessoaJuridica: [pessoa.isPessoaJuridica],
      cpf: [pessoa.cpf, pessoa.isPessoaJuridica ? [] : [validarCPF()]],
      cnpj: [pessoa.cnpj, pessoa.isPessoaJuridica ? [validarCNPJ()] : []],
      escola: [pessoa.escola, Validators.required],
    });
  }

  salvarDadosCadastrais(): void {
    if (this.formularioService.formularioIsValido(this.formDadosCadastrais)) {
      this.pessoaService
        .atualizarPessoaEmAndamento(this.formDadosCadastrais.value)
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: `Dados da pessoa de nome ${res.nome} salvos com sucesso!`,
          });
          this.criouNovaPessoa.emit(res);
        });
    }
  }
}
