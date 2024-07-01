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
import TaskList from '../../Types/tasklist.model';
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
  imports: [CommonModule, TaskComponent, MatDatepickerModule, MatButtonModule],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit, OnDestroy {
  taskLists: TaskList[] = [];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  private subscription: Subscription = new Subscription();

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
        end: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 1);
          return date;
        })(),
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
        end: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          return date;
        })(),
      },
    },
    {
      label: 'Earlier',
      range: {
        start: new Date(0), // Epoch start date, represents a very old date
        end: (() => {
          const date = new Date();
          date.setDate(date.getDate() - 2);
          return date;
        })(),
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
        end: new Date(8640000000000000), // Max possible date, represents a very distant future date
      },
    },
  ];

  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  selectedDateRange: { start: Date; end: Date } | null = null;

  constructor(private taskService: TaskService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.taskService.getTaskLists().subscribe(taskLists => {
        this.taskLists = taskLists;
        this.updateTasks(); // Load tasks for the first task list initially
      })
    );
  }

  selectPreset(presetDateRange: { start: Date; end: Date }): void {
    this.selectedDateRange = presetDateRange;
    this.filterTasks();
    if (presetDateRange.start && this.calendar) {
      this.calendar._goToDateInView(presetDateRange.start, 'month');
    }
  }

  updateTasks(): void {
    if (this.taskLists.length > 0) {
      const currentTaskList = this.taskLists[0]; // Assuming you want the first task list
      this.tasks = currentTaskList.Tasks ?? [];
      this.filteredTasks = this.tasks; // Initialize filteredTasks with all tasks
    }
  }

  filterTasks(): void {
    if (this.selectedDateRange) {
      const start = moment(this.selectedDateRange.start).startOf('day');
      const end = moment(this.selectedDateRange.end).endOf('day');
      this.filteredTasks = this.tasks.filter(task => {
        const taskDueDate = moment(task.dueDate);
        if (this.selectedDateRange.start.getTime() === new Date(0).getTime()) {
          // Handle "Earlier" case
          return taskDueDate.isBefore(end);
        } else if (this.selectedDateRange.end.getTime() === new Date(8640000000000000).getTime()) {
          // Handle "Later" case
          return taskDueDate.isAfter(start);
        } else {
          return taskDueDate.isBetween(start, end, null, '[]');
        }
      });
    } else {
      this.filteredTasks = this.tasks; // Show all tasks if no date range is selected
    }
  }

  

  deleteTask(taskId: string, taskListId: string): void {
    const taskList = this.taskLists.find(list => list.id === taskListId);
    if (taskList) {
      taskList.Tasks = taskList.Tasks.filter(task => task.id !== taskId);
      this.taskService.deleteTaskInTaskList(taskId, taskListId);
    }
  }
}
