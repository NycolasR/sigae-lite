import { Component, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { validarEmail } from '../../../shared/validadores/email-validator';
import {
  MSG_FORMULARIO_INVALIDO,
  MSG_PREENCHIMENTO_INCORRETO,
} from '../../../shared/mensagens/mensagens';
import { validarTelefone } from '../../../shared/validadores/telefone-validador';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';
import { Pessoa } from '../../../shared/models/pessoa/pessoa';
import { PessoaService } from '../../../shared/services/pessoa/pessoa.service';

@Component({
  selector: 'app-dados-contato',
  templateUrl: './dados-contato.component.html',
  styleUrls: ['./dados-contato.component.scss'],
})
export class DadosContatoComponent implements OnInit {
  formDadosContato: FormGroup = new FormGroup({});

  criouDadosDeContato = output<Pessoa>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
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
      numero: [null, validarTelefone()],
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

  getTelefoneFormGroup(index: number): FormGroup {
    return this.telefones.at(index) as FormGroup;
  }

  salvarDadosContato(): void {
    if (this.formularioService.formularioIsValido(this.formDadosContato)) {
      this.pessoaService.criar(this.formDadosContato.value).subscribe((res) => {
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
