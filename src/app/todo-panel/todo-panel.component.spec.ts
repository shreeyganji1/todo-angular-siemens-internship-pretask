import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPanelComponent } from './todo-panel.component';

describe('TodoPanelComponent', () => {
  let component: TodoPanelComponent;
  let fixture: ComponentFixture<TodoPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
