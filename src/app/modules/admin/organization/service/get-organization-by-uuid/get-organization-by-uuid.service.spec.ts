import { TestBed } from '@angular/core/testing';

import { GetOrganizationByUuidService } from './get-organization-by-uuid.service';

describe('GetOrganizationByUuidService', () => {
  let service: GetOrganizationByUuidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrganizationByUuidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
