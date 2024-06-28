import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TaskheaderComponent } from "./taskheader/taskheader.component";
import { TasklistComponent } from "./tasklist/tasklist.component";
import { AddtaskComponent } from "./addtask/addtask.component";
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TaskService } from '../services/task.service';
import Task from '../Types/task.model';
import { Subscription } from 'rxjs';
import { TasklistModule } from './tasklist/tasklist.module';

@Component({
  selector: 'app-todo-panel',
  standalone: true,
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.scss'],
  imports: [TaskheaderComponent, TasklistComponent, AddtaskComponent, TodoDetailComponent]
})
export class TodoPanelComponent implements OnDestroy {
  @ViewChild('todoDetail') taskInput!: ElementRef<HTMLDivElement>;
  @ViewChild(TasklistComponent)
  taskListComponent!: TasklistComponent;

  todoDetailClass: string = "todo-detail";
  task!: Task;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService) {
    const showTaskDetailsSubscription = this.taskService.getShowTaskDetailsSubject().subscribe(taskAction => {
      if (taskAction.action == "show") {
        this.todoDetailClass = "todo-detail active";
        this.task = taskAction.task;
      } else if (taskAction.action == "hide") {
        this.todoDetailClass = "todo-detail";
      } else if (taskAction.action == "delete") {
        this.todoDetailClass = "todo-detail";
        this.taskListComponent.deleteTask(taskAction.task.id);
      }
    });
    this.subs.push(showTaskDetailsSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}








