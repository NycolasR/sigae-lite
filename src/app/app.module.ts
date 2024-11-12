import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { authReducer } from './store/auth.reducer';
import { HomeComponent } from './modules/home/home.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { SharedSigaeModule } from './modules/shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule, // Importa o módulo de rotas
    StoreModule.forRoot({ auth: authReducer }), // Configuração do Redux com o reducer de autenticação
    SharedSigaeModule,
  ],
  providers: [AuthGuard], // Define o AuthGuard como provedor
})
export class AppModule {}
