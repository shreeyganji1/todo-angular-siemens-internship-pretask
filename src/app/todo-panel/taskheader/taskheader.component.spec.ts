import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskheaderComponent } from './taskheader.component';

describe('TaskheaderComponent', () => {
  let component: TaskheaderComponent;
  let fixture: ComponentFixture<TaskheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
