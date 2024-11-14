import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  validarCNPJ,
  validarCPF,
} from '../../../validadores/documento-validador';
import {
  MSG_FORMULARIO_INVALIDO,
  MSG_PREENCHIMENTO_INCORRETO,
} from '../../../mensagens/mensagens';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.scss'],
})
export class DadosCadastraisComponent implements OnInit {
  formDadosCadastrais: FormGroup = new FormGroup({});
  isPessoaJuridica: boolean = false;

  escolas: string[] = ['Escola A', 'Escola B', 'Escola C'];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    // Habilita/Desabilita CPF e CNPJ dependendo do tipo de pessoa
    this.formDadosCadastrais
      .get('pessoaJuridica')
      ?.valueChanges.subscribe((isJuridica) => {
        // Alterna flag para esconder o campo de CPF e exibir o campo de CNPJ
        this.isPessoaJuridica = isJuridica;

        if (this.isPessoaJuridica) {
          // Retira os validadores do CPF
          this.formDadosCadastrais.get('cpf')?.clearValidators();

          // Aciona o validador do CNPJ
          this.formDadosCadastrais.get('cnpj')?.setValidators([validarCNPJ()]);
        } else {
          // Ação inversa nos validadores, já que está sendo exibido o campo de CPF
          this.formDadosCadastrais.get('cnpj')?.clearValidators();
          this.formDadosCadastrais.get('cpf')?.setValidators([validarCPF()]);
        }

        // Sincronizando as alterações nas validações com o formulário
        this.formDadosCadastrais.get('cpf')?.updateValueAndValidity();
        this.formDadosCadastrais.get('cnpj')?.updateValueAndValidity();
      });
  }

  buildForm() {
    this.formDadosCadastrais = this.formBuilder.group({
      nome: [null, Validators.required],
      nomeSocial: [null],
      pessoaJuridica: [false],
      // chamando o validadores personalizados
      cpf: [null, validarCPF()],
      cnpj: [null],
      escola: [null, Validators.required],
    });
  }

  salvarDadosCadastrais(): void {
    if (this.formDadosCadastrais.valid) {
      console.log(this.formDadosCadastrais.value);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: MSG_FORMULARIO_INVALIDO,
        detail: MSG_PREENCHIMENTO_INCORRETO,
      });
    }
  }
}
