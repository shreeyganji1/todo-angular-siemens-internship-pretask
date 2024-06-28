import { TestBed } from '@angular/core/testing';

import { TaskcontextmenuService } from './taskcontextmenu.service';

describe('TaskcontextmenuService', () => {
  let service: TaskcontextmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskcontextmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
