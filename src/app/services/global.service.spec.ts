import { TestBed } from '@angular/core/testing';

import { GlobalService } from './global.service';

describe('AuthService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
