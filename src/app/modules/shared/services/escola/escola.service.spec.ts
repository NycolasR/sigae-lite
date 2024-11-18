/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EscolaService } from './escola.service';

describe('Service: Escola', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscolaService]
    });
  });

  it('should ...', inject([EscolaService], (service: EscolaService) => {
    expect(service).toBeTruthy();
  }));
});
