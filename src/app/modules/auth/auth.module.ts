import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing.module';
import { SharedSigaeModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    AuthRoutingModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    SharedSigaeModule,
  ],
  declarations: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
