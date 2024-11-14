import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  MSG_FORMULARIO_INVALIDO,
  MSG_PREENCHIMENTO_INCORRETO,
} from '../../../mensagens/mensagens';

@Component({
  selector: 'app-dados-endereco',
  templateUrl: './dados-endereco.component.html',
  styleUrls: ['./dados-endereco.component.scss'],
})
export class DadosEnderecoComponent implements OnInit {
  formDadosEndereco: FormGroup = new FormGroup({});

  paises: string[] = ['País A', 'País B', 'País C'];
  estados: string[] = ['Estado A', 'Estado B', 'Estado C'];
  municipios: string[] = ['Municipio A', 'Municipio B', 'Municipio C'];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formDadosEndereco = this.formBuilder.group({
      enderecoCompleto: [null, Validators.required],
      cep: [null],
      pais: [null],
      estado: [null, Validators.required],
      municipio: [null, Validators.required],
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
