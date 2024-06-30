import { Component, Input } from '@angular/core';
import Task from '../../../Types/task.model';
import { TaskService } from '../../../services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  @Input()
  public task!: Task;

  constructor(private taskService: TaskService) {}

  deleteTask($event : any) {
    
    this.taskService.deleteTaskInTaskList(this.task.id, this.task.taskListId);

    this.taskService.getShowTaskDetailsSubject().next({task: this.task, action: "delete"});
  }

}