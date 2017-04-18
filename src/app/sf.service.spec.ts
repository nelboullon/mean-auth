import { TestBed, inject } from '@angular/core/testing';

import { SfService } from './sf.service';

describe('SfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SfService]
    });
  });

  it('should ...', inject([SfService], (service: SfService) => {
    expect(service).toBeTruthy();
  }));
});
