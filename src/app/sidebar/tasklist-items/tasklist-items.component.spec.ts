import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistItemsComponent } from './tasklist-items.component';

describe('TasklistItemsComponent', () => {
  let component: TasklistItemsComponent;
  let fixture: ComponentFixture<TasklistItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasklistItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasklistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
