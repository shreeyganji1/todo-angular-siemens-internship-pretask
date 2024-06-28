import { Component, OnInit, OnDestroy } from '@angular/core';
import Task from '../../Types/task.model';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { TaskComponent } from '../../todo-panel/tasklist/task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grouped-tasks',
  templateUrl: './grouped-tasks.component.html',
  styleUrls: ['./grouped-tasks.component.css'],
  standalone: true,
  imports: [TaskComponent,CommonModule]
})
export class GroupedTasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  importantCount: number = 0;
  subs: Subscription[] = [];
  taskListId: string = 'default';


  constructor(private taskService: TaskService) {}


  ngOnInit(): void {
    this.loadTasks();
    this.importantCount = this.taskService.getImportantCountFromStorage();
    
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  loadTasks(): void {
    const tasksSubscription = this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.updateImportantCount();
    });
    this.subs.push(tasksSubscription);
  }

  updateImportantCount(): void {
    const importantCount = this.tasks.filter(task => task.important).length;
    this.taskService.saveImportantCountToStorage(importantCount);
    this.importantCount = importantCount;
  }


  taskImportantChanged(event: { taskId: string, important: boolean }): void {
    const task = this.tasks.find(t => t.id === event.taskId);
    if (task) {
      task.important = event.important;
      this.taskService.updateTaskImportant(event.taskId, event.important);
      this.updateImportantCount();
    }
  }
  
}