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
import { Telefone } from '../../../shared/models/pessoa/telefone';

@Component({
  selector: 'app-dados-contato',
  templateUrl: './dados-contato.component.html',
  styleUrls: ['./dados-contato.component.scss'],
})
export class DadosContatoComponent implements OnInit {
  formDadosContato: FormGroup = new FormGroup({});

  pessoa: Pessoa = new Pessoa({});

  clicouBtnAnterior = output<boolean>();
  criouDadosDeContato = output<Pessoa>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.pessoaService.obterPessoaEmAndamento().subscribe((res: Pessoa) => {
      this.pessoa = res;
      this.buildForm(res);
    });
  }

  buildForm(pessoa: Pessoa): void {
    this.formDadosContato = this.formBuilder.group({
      email: [pessoa.email, [Validators.required, validarEmail()]],
      telefones: this.formBuilder.array(
        pessoa.telefones && pessoa.telefones.length > 0
          ? pessoa.telefones.map((telefone) =>
              this.criarTelefoneControl(telefone.numero)
            )
          : [this.criarTelefoneControl()]
      ),
    });
  }

  criarTelefoneControl(numero: string | null = null): FormGroup {
    return this.formBuilder.group({
      numero: [numero, validarTelefone()],
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
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: `Telefone excluído com sucesso!`,
      });
    }
  }

  getTelefoneFormGroup(index: number): FormGroup {
    return this.telefones.at(index) as FormGroup;
  }

  salvarDadosContato(): void {
    if (this.formularioService.formularioIsValido(this.formDadosContato)) {
      const dadosContato = {
        ...this.formDadosContato.value,
        telefones: this.formDadosContato.value.telefones.filter(
          (telefone: Telefone) => telefone.numero
        ),
      };

      this.pessoaService
        .atualizarPessoaEmAndamento(dadosContato)
        .subscribe((res) => {
          if (!this.formDadosContato.pristine) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: `Dados de contato salvos com sucesso!`,
            });
          }
          this.criouDadosDeContato.emit(res);
        });
    }
  }
}
