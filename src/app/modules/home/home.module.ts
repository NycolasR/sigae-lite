import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedSigaeModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedSigaeModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
