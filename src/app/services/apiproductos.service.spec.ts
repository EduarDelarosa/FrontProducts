import { TestBed } from '@angular/core/testing';

import { ApiproductosService } from './apiproductos.service';

describe('ApiproductosService', () => {
  let service: ApiproductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiproductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
