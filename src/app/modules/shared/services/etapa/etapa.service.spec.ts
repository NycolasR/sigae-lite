/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtapaService } from './etapa.service';

describe('Service: Etapa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtapaService]
    });
  });

  it('should ...', inject([EtapaService], (service: EtapaService) => {
    expect(service).toBeTruthy();
  }));
});
