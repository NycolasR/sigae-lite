import { Component, input, OnInit, output } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.scss'],
})
export class DadosCadastraisComponent implements OnInit {
  pessoa: Pessoa = new Pessoa({});
  escolas: string[] = ['Escola A', 'Escola B', 'Escola C'];
  modoEdicao: boolean = false;
  formDadosCadastrais: FormGroup = new FormGroup({});

  idPessoa = input(0);

  salvouDadosCadastrais = output<Pessoa>();

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.tratarModoEdicao();
    this.obterPessoa();

    this.formDadosCadastrais
      .get('isPessoaJuridica')
      ?.valueChanges.subscribe((isJuridica: boolean) => {
        this.alternarCamposCpfCanpj(isJuridica);
      });
  }

  private tratarModoEdicao(): void {
    this.modoEdicao = this.idPessoa() !== 0;
  }

  private obterPessoa() {
    const obterPessoa = this.modoEdicao
      ? () => this.pessoaService.buscarPorId(this.idPessoa())
      : () => this.pessoaService.obterPessoaEmAndamento();

    obterPessoa().subscribe((res: Pessoa | undefined) => {
      if (res) {
        this.pessoa = res;
        this.buildForm(res);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Houve um erro',
          detail: `Não foi possível obter a pessoa com o ID informado.`,
        });
        this.router.navigate(['/pessoa']);
      }
    });
  }

  private alternarCamposCpfCanpj(isJuridica: boolean) {
    if (isJuridica) {
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

  buildForm(pessoa: Pessoa): void {
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
      const atualizarPessoa = this.modoEdicao
        ? () =>
            this.pessoaService.atualizar(
              this.idPessoa(),
              this.formDadosCadastrais.value
            )
        : () =>
            this.pessoaService.atualizarPessoaEmAndamento(
              this.formDadosCadastrais.value
            );

      atualizarPessoa().subscribe((res) => {
        if (res) {
          if (!this.formDadosCadastrais.pristine) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: `Dados da pessoa de nome ${res.nome} salvos com sucesso!`,
            });
          }
          this.salvouDadosCadastrais.emit(res);
        }
      });
    }
  }
}
