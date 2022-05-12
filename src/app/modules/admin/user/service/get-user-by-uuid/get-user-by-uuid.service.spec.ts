import { TestBed } from '@angular/core/testing';

import { GetUserByUuidService } from './get-user-by-uuid.service';

describe('GetUserByUuidService', () => {
  let service: GetUserByUuidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserByUuidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
