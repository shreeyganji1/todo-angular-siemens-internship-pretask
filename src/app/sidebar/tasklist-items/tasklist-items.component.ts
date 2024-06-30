/*import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import TaskList from '../../Types/tasklist.model';
import { TasklistItemComponent } from './tasklist-item/tasklist-item.component';
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import Task from '../../Types/task.model';
import { CommonModule } from '@angular/common';

// Adjust the path accordingly

@Component({
  selector: 'app-tasklist-items',
  standalone: true,
  templateUrl: './tasklist-items.component.html',
  styleUrl: './tasklist-items.component.scss',
  imports: [TasklistItemComponent,CommonModule]
})
  export class TasklistItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  public tasklistitems: TaskList[];
   
  activeItem!: number;
  @ViewChildren(TasklistItemComponent) taskListItemsComponent!: QueryList<TasklistItemComponent>;
  subs: Subscription[] = [];

  
  /*constructor(private taskService: TaskService, private eleRef: ElementRef) {
    this.subs.push(
      this.taskService.getTaskListSubject().subscribe(taskLists => {
        this.tasklistitems = taskLists;
      })
    );
  }*/

  /*constructor(private taskService: TaskService, private eleRef: ElementRef){
    const renderSidePanleSubscription = this.taskService
    .getRenderSidePanelSubject()
    .subscribe(taskListItems => {
     
      let taskListItems: TaskList[] = this.taskService.getTaskListItems();
      this.tasklistitems = taskListItems;

      this.taskService.setTaskListItems(this.tasklistitems);
    });
    this.subs.push(renderSidePanleSubscription);
  }*/

  /*ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }*/
  
  /*ngOnInit(): void {
    this.tasklistitems = this.taskService.getTaskListItems();
    if (!this.tasklistitems.length) {
      this.initializeDefaultTaskLists();
    }
  }*/

 
  /*ngOnInit(): void {
    this.taskService.setTaskListItems(this.tasklistitems);
  }

  ngAfterViewInit(): void {
    this.renderFirstItem();
  }

  activeItemDeleted() {
    this.renderFirstItem();
  }*/


  /*renderFirstItem() {
    if (this.tasklistitems.length == 0) return;
    queueMicrotask(() => {
      this.taskListItemsComponent.forEach((item: TasklistItemComponent, index: number) => {
        if (index == 0) {
          let firstItem = this.eleRef.nativeElement.querySelector(`.tasklist-item-${index}`);
          firstItem.dispatchEvent(new Event('click'));
        }
      });
    });
  }*/


  /*renderFirstItem() {
    if(this.tasklistitems.length == 0) return;
    queueMicrotask(() => {
      this.taskListItemsComponent.forEach((item: TasklistItemComponent, index: number) => {
        if (index == 0) {
          let firstItem = this.eleRef.nativeElement.querySelector(`.tasklist-item-${index}`);
          firstItem.dispatchEvent(new Event('click'));
        }
      });
    });
  }

  onClicked($event: number) {
    this.activeItem = $event;
  }

  addTask(taskName: string, taskListId: string) {
  
    const newTask: Task = {
      id: 'unique-task-id',
      name: 'New Task',
      date: new Date(),
      done: false,
      important: false
    };

    this.taskService.addTaskInTaskList(newTask, taskListId);
  }

  private initializeDefaultTaskLists() {
    this.tasklistitems = [
    
    ];
  }
}*/

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import TaskList from '../../Types/tasklist.model';
import { TasklistItemComponent } from './tasklist-item/tasklist-item.component';
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import Task from '../../Types/task.model';

@Component({
  selector: 'app-tasklist-items',
  standalone: true,
  templateUrl: './tasklist-items.component.html',
  styleUrls: ['./tasklist-items.component.scss'],
  imports: [TasklistItemComponent]
})
export class TasklistItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  tasklistitems: TaskList[] = [];
  activeItem!: number;
  @ViewChildren(TasklistItemComponent) taskListItemsComponent!: QueryList<TasklistItemComponent>;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService, private eleRef: ElementRef) {
    this.subs.push(
      this.taskService.getTaskListSubject().subscribe(taskLists => {
        this.tasklistitems = taskLists;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  
  ngOnInit(): void {
    this.tasklistitems = this.taskService.getTaskListItems();
    if (!this.tasklistitems.length) {
      this.initializeDefaultTaskLists();
    }
  }

  ngAfterViewInit(): void {
    this.renderFirstItem();
  }

  activeItemDeleted() {
    this.renderFirstItem();
  }

  renderFirstItem() {
    if (this.tasklistitems.length == 0) return;
    queueMicrotask(() => {
      this.taskListItemsComponent.forEach((item: TasklistItemComponent, index: number) => {
        if (index == 0) {
          let firstItem = this.eleRef.nativeElement.querySelector(`.tasklist-item-${index}`);
          firstItem.dispatchEvent(new Event('click'));
        }
      });
    });
  }

  onClicked($event: number) {
    this.activeItem = $event;
  }

  public addTaskInTaskList(newTask: Task, taskListId: string) {
    const taskListIndex = this.tasklistitems.findIndex(list => list.id === taskListId);
    if (taskListIndex !== -1) {
      newTask.date = new Date(); // Ensure date is set
      this.tasklistitems[taskListIndex].Tasks.push(newTask);
      this.saveTaskListToStorage();
      this.taskService.getRenderSidePanelSubject().next([...this.tasklistitems]);
      // this.taskService.getAddTaskInTaskListSubject().next(newTask); // This line should be updated
      this.taskService.getAddTaskInTaskListSubject().next([...this.tasklistitems]);
    }
  }

  private saveTaskListToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tasklistitems', JSON.stringify(this.tasklistitems));
    }
  }

  addTask(taskName: string, taskListId: string) {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      done: false,
      important: false,
      date: new Date(),
    };
    this.taskService.addTaskInTaskList(newTask, taskListId);
  }

  getAllTasks(): Task[] {
    return this.tasklistitems.flatMap(taskList => taskList.Tasks);
  }

  private initializeDefaultTaskLists() {
    this.tasklistitems = [];
  }
}
