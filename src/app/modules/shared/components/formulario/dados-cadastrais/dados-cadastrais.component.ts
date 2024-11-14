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
