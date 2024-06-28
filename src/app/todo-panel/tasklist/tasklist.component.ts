/*import { Component, OnDestroy, OnInit } from '@angular/core';
import Task from '../../Types/task.model';
import { TaskComponent } from "./task/task.component";
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrls: ['./tasklist.component.scss'],
    imports: [TaskComponent]
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  taskListId!: string;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService) { }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    const taskListSubscription = this.taskService.getTaskListSubject().subscribe((taskLists) => {
      if (taskLists.length > 0) {
        const currentTaskList = taskLists[0]; // Assuming you want the first task list
        this.tasks = currentTaskList.Tasks ?? [];
        this.taskListId = currentTaskList.id;
      }
    });
    this.subs.push(taskListSubscription);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}*/
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Task from '../../Types/task.model';
import { TaskComponent } from "./task/task.component";
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports:[CommonModule,TaskComponent],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskListId!: string;
  private subscription!: Subscription;

  presets = [
    {
      label: 'Today',
      range: {
        start: new Date(),
        end: new Date(),
      },
    },
    {
      label: 'Yesterday',
      range: {
        start: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date;
        })(),
        end: new Date(),
      },
    },
    {
      label: 'Tomorrow',
      range: {
        start: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          return date;
        })(),
        end: new Date(),
      },
    },
    {
      label: 'Earlier',
      range: {
        start: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 2);
          return date;
        })(),
        end: new Date(),
      },
    },
    {
      label: 'Later',
      range: {
        start: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 2);
          return date;
        })(),
        end: new Date(),
      },
    },
  ];

  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  selectedDateRange: { start: Date; end: Date } | null = null;

  constructor(private taskService: TaskService) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.taskService.getTaskListSubject().subscribe(taskLists => {
      if (taskLists.length > 0) {
        const currentTaskList = taskLists[0]; // Assuming you want the first task list
        this.tasks = currentTaskList.Tasks ?? [];
        this.filteredTasks = this.tasks; // Initialize filteredTasks with all tasks
      }
    });
  }

  selectPreset(presetDateRange: { start: Date; end: Date }): void {
    this.selectedDateRange = presetDateRange;
    this.filterTasks();
    if (presetDateRange.start && this.calendar) {
      this.calendar._goToDateInView(presetDateRange.start, 'month');
    }
  }

  filterTasks(): void {
    if (this.selectedDateRange) {
      const start = moment(this.selectedDateRange.start).startOf('day');
      const end = moment(this.selectedDateRange.end).endOf('day');
      this.filteredTasks = this.tasks.filter(task => {
        const taskDueDate = moment(task.dueDate);
        return taskDueDate.isBetween(start, end, null, '[]');
      });
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.filterTasks(); // Re-filter tasks after deletion
  }
}
