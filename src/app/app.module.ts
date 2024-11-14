import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    SharedSigaeModule,
  ],
  providers: [AuthGuard],
})
export class AppModule {}
