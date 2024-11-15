import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guards/auth.guard';
import { HomeModule } from './modules/home/home.module';
import { authReducer } from './store/auth.reducer';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { AppRoutingModule } from './app-routing.module';
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
