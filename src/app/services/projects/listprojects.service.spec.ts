import { TestBed } from '@angular/core/testing';

import { ListprojectsService } from './listprojects.service';

describe('ListprojectsService', () => {
  let service: ListprojectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListprojectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
