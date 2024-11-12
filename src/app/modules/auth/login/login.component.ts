import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from '../../../store/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarEmail } from '../../shared/validadores/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private store: Store<{ auth: any }>,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    // Observa mudanças no estado de autenticação para redirecionar após login
    this.store.select('auth').subscribe((authState) => {
      if (authState.token) {
        // Verifica se o token está presente no estado
        this.router.navigate(['/inicio']); // Redireciona para a rota protegida
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, validarEmail()]],
      senha: [null, Validators.required],
    });
  }

  formularioIsValido(): boolean {
    this.formLogin.markAllAsTouched();
    return this.formLogin.valid;
  }

  fazerLogin() {
    if (this.formularioIsValido()) {
      this.store.dispatch(
        login(
          this.formLogin.get('email')?.value,
          this.formLogin.get('senha')?.value
        )
      );
    }
  }
}
