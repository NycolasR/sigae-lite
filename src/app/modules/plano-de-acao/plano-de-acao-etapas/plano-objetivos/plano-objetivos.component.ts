import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanoService } from './../../../shared/services/plano/plano.service';

@Component({
  selector: 'app-plano-objetivos',
  templateUrl: './plano-objetivos.component.html',
  styleUrls: ['./plano-objetivos.component.scss'],
})
export class PlanoObjetivosComponent implements OnInit {
  formPlanoObjetivos: FormGroup = new FormGroup({});

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly planoService: PlanoService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formPlanoObjetivos = this.formBuilder.group({
      plano: [null, [Validators.required]],
      objetivos: this.formBuilder.array([this.criarObjetivoControl()]),
    });
  }

  criarObjetivoControl(): FormGroup {
    return this.formBuilder.group({
      objetivo: [null, [Validators.required]],
      objetivoSelecionado: [false],
    });
  }

  get objetivos(): FormArray {
    return this.formPlanoObjetivos.get('objetivos') as FormArray;
  }

  salvarDadosContato(): void {
    // if (this.formPlanoObjetivos.valid) {
    //   console.log(this.formPlanoObjetivos.value);
    // } else {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: MSG_FORMULARIO_INVALIDO,
    //     detail: MSG_PREENCHIMENTO_INCORRETO,
    //   });
    // }
  }
}
