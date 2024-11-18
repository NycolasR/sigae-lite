import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from '../../../store/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarEmail } from '../../shared/validadores/email-validator';
import { FormularioService } from './../../shared/services/formulario/formulario.service';
import { AuthState } from '../../../store/auth.reducer';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup = new FormGroup({});

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<{ auth: any }>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly formularioService: FormularioService
  ) {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authState) => {
        if (authState.token) {
          this.router.navigate(['/inicio']);
        } else if (authState.error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: authState.error,
          });
        }
      });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, validarEmail()]],
      senha: [null, Validators.required],
    });
  }

  fazerLogin() {
    if (this.formularioService.formularioIsValido(this.formLogin)) {
      this.store.dispatch(
        login(
          this.formLogin.get('email')?.value,
          this.formLogin.get('senha')?.value
        )
      );
    }
  }
}
