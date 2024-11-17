import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormularioService } from '../../../../shared/services/formulario/formulario.service';
import { MessageService } from 'primeng/api';
import { PlanoService } from './../../../../shared/services/plano/plano.service';
import { PessoaService } from '../../../../shared/services/pessoa/pessoa.service';
import { Pessoa } from '../../../../shared/models/pessoa/pessoa';

@Component({
  selector: 'app-modal-acoes',
  templateUrl: './modal-acoes.component.html',
  styleUrls: ['./modal-acoes.component.scss'],
})
export class ModalAcoesComponent implements OnInit {
  formModalAcoes: FormGroup = new FormGroup({});

  pessoas: Pessoa[] = [];

  constructor(
    public config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly formBuilder: FormBuilder,
    private readonly planoService: PlanoService,
    private readonly pessoaService: PessoaService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.formModalAcoes = this.formBuilder.group({
      descricao: [null, Validators.required],
      responsavel: [null, Validators.required],
    });
  }

  fechar() {
    this.ref.close();
  }

  salvarDadosAcao() {}
}
