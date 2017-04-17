import { TestBed, inject } from '@angular/core/testing';

import { AnimalsService } from './animals.service';

describe('AnimalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalsService]
    });
  });

  it('should ...', inject([AnimalsService], (service: AnimalsService) => {
    expect(service).toBeTruthy();
  }));
});
