import { TestBed } from '@angular/core/testing';

import { AdminUserListService } from './admin-user-list.service';

describe('AdminUserListService', () => {
  let service: AdminUserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
