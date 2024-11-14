import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  MSG_FORMULARIO_INVALIDO,
  MSG_PREENCHIMENTO_INCORRETO,
} from '../../../../mensagens/mensagens';
import { validarEmail } from '../../../../validadores/email-validator';

@Component({
  selector: 'app-dados-contato',
  templateUrl: './dados-contato.component.html',
  styleUrls: ['./dados-contato.component.scss'],
})
export class DadosContatoComponent implements OnInit {
  formDadosContato: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formDadosContato = this.formBuilder.group({
      email: [null, [Validators.required, validarEmail()]],
      telefones: this.formBuilder.array([this.criarTelefoneControl()]),
    });
  }

  criarTelefoneControl(): FormGroup {
    return this.formBuilder.group({
      numero: [null, [Validators.pattern('^[0-9]{10,11}$')]],
    });
  }

  get telefones(): FormArray {
    return this.formDadosContato.get('telefones') as FormArray;
  }

  adicionarTelefone(): void {
    this.telefones.push(this.criarTelefoneControl());
  }

  removerTelefone(index: number): void {
    if (this.telefones.length > 1) {
      this.telefones.removeAt(index);
    }
  }

  salvarDadosContato(): void {
    if (this.formDadosContato.valid) {
      console.log(this.formDadosContato.value);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: MSG_FORMULARIO_INVALIDO,
        detail: MSG_PREENCHIMENTO_INCORRETO,
      });
    }
  }
}
