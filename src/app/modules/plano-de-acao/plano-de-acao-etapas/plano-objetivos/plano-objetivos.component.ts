import { Component, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanoService } from './../../../shared/services/plano/plano.service';
import { PlanoDeAcao } from './../../../shared/models/planoDeAcao/planoDeAcao';
import { Objetivo } from './../../../shared/models/planoDeAcao/objetivo';
import { MessageService } from 'primeng/api';
import { FormularioService } from '../../../shared/services/formulario/formulario.service';

@Component({
  selector: 'app-plano-objetivos',
  templateUrl: './plano-objetivos.component.html',
  styleUrls: ['./plano-objetivos.component.scss'],
})
export class PlanoObjetivosComponent implements OnInit {
  planoDeAcao: PlanoDeAcao = new PlanoDeAcao({});
  formPlanoObjetivos: FormGroup = new FormGroup({});

  salvouPlanoObjetivos = output<PlanoDeAcao>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly planoService: PlanoService,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.obterPlano();
  }

  private obterPlano() {
    this.planoService.obterPlano().subscribe((res: PlanoDeAcao) => {
      this.planoDeAcao = res;
      this.buildForm(res);
    });
  }

  buildForm(plano: PlanoDeAcao) {
    this.formPlanoObjetivos = this.formBuilder.group({
      descricao: [
        plano.descricao,
        [Validators.required, Validators.maxLength(25)],
      ],
      objetivos: this.formBuilder.array(
        plano.objetivos.map((objetivo) => this.criarObjetivoControl(objetivo))
      ),
    });

    this.observarCheckbox();
  }

  criarObjetivoControl(objetivo: Objetivo): FormGroup {
    return this.formBuilder.group({
      id: [objetivo.id],
      nome: [objetivo.nome],
      selecionado: [objetivo.selecionado],
    });
  }

  observarCheckbox() {
    const objetivosArray = this.formPlanoObjetivos.get(
      'objetivos'
    ) as FormArray;

    objetivosArray.controls.forEach((control) => {
      control.get('selecionado')?.valueChanges.subscribe((isChecked) => {
        const objetivoControl = control.get('nome');
        if (isChecked) {
          objetivoControl?.addValidators([
            Validators.required,
            Validators.maxLength(25),
          ]);
        } else {
          objetivoControl?.removeValidators([
            Validators.required,
            Validators.maxLength(25),
          ]);
        }
        objetivoControl?.updateValueAndValidity();
      });
    });
  }

  possuiErro(controlName: string, index: number): boolean {
    const control = this.objetivos.at(index).get(controlName);

    if (control) return control?.invalid && (control.touched || control.dirty);
    return false;
  }

  isRequired(controlName: string, index: number): boolean {
    const control = this.objetivos.at(index).get(controlName);
    return control?.hasValidator(Validators.required) ?? false;
  }

  possuiErroEspecifico(
    controlName: string,
    error: string,
    formArrayName: string,
    index: number
  ): boolean {
    const formArray = this.formPlanoObjetivos.get(formArrayName) as FormArray;
    const control = formArray?.at(index)?.get(controlName);
    return !!(control?.hasError(error) && (control.touched || control.dirty));
  }

  get objetivos(): FormArray {
    return this.formPlanoObjetivos.get('objetivos') as FormArray;
  }

  getObjetivosSelecionados() {
    const objetivosArray = this.formPlanoObjetivos.get(
      'objetivos'
    ) as FormArray;
    return objetivosArray.controls.filter(
      (control) => control.get('selecionado')?.value === true
    );
  }

  salvarDadosContato(): void {
    if (this.formularioService.formularioIsValido(this.formPlanoObjetivos)) {
      const objetivosSelecionados = this.getObjetivosSelecionados();

      if (objetivosSelecionados.length === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Selecione pelo menos um objetivo antes de salvar.',
        });
        return;
      }

      this.planoService
        .atualizarPlano(this.formPlanoObjetivos.value)
        .subscribe((res: PlanoDeAcao) => {
          if (!this.formPlanoObjetivos.pristine) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Plano e objetivo(s) salvos com sucesso!',
            });
          }

          this.salvouPlanoObjetivos.emit(res);
        });
    }
  }
}
