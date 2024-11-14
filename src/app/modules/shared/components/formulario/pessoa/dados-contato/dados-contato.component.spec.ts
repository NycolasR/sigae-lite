/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DadosContatoComponent } from './dados-contato.component';

describe('DadosContatoComponent', () => {
  let component: DadosContatoComponent;
  let fixture: ComponentFixture<DadosContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
