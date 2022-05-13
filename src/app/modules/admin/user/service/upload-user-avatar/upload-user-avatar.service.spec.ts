import { TestBed } from '@angular/core/testing';

import { UploadUserAvatarService } from './upload-user-avatar.service';

describe('UploadUserAvatarService', () => {
  let service: UploadUserAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadUserAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
