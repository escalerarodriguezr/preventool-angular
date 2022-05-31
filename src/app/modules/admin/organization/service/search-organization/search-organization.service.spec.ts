import { TestBed } from '@angular/core/testing';

import { SearchOrganizationService } from './search-organization.service';

describe('SearchOrganizationService', () => {
  let service: SearchOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
