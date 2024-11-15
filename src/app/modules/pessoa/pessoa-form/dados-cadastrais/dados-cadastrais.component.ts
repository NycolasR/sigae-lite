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
  isPessoaJuridica: boolean = false;

  escolas: string[] = ['Escola A', 'Escola B', 'Escola C'];

  criouNovaPessoa = output<Pessoa>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.formDadosCadastrais
      .get('pessoaJuridica')
      ?.valueChanges.subscribe((isJuridica) => {
        this.isPessoaJuridica = isJuridica;

        if (this.isPessoaJuridica) {
          this.formDadosCadastrais.get('cpf')?.clearValidators();
          this.formDadosCadastrais.get('cnpj')?.setValidators([validarCNPJ()]);
        } else {
          this.formDadosCadastrais.get('cnpj')?.clearValidators();
          this.formDadosCadastrais.get('cpf')?.setValidators([validarCPF()]);
        }

        this.formDadosCadastrais.get('cpf')?.updateValueAndValidity();
        this.formDadosCadastrais.get('cnpj')?.updateValueAndValidity();
      });
  }

  buildForm() {
    this.formDadosCadastrais = this.formBuilder.group({
      nome: [null, Validators.required],
      nomeSocial: [null],
      pessoaJuridica: [false],
      cpf: [null, validarCPF()],
      cnpj: [null],
      escola: [null, Validators.required],
    });
  }

  salvarDadosCadastrais(): void {
    if (this.formularioService.formularioIsValido(this.formDadosCadastrais)) {
      this.pessoaService
        .criar(this.formDadosCadastrais.value)
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: `Pessoa de nome ${res.nome} criada com sucesso!`,
          });
          this.criouNovaPessoa.emit(res);
        });
    }
  }
}
