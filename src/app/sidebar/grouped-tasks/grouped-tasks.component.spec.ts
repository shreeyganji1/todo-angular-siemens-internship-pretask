import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedTasksComponent } from './grouped-tasks.component';

describe('GroupedTasksComponent', () => {
  let component: GroupedTasksComponent;
  let fixture: ComponentFixture<GroupedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
