/*import { Injectable } from '@angular/core';

import TaskList from '../Types/tasklist.model';
import { BehaviorSubject, Observable, Subject ,of} from 'rxjs';
import Task from '../Types/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
  
  ];

 
  getTasks(): Observable<Task[]> {
    return of(this.tasks); // Use of() to create an observable from the array
  }
 


  public tasklistitems: TaskList[] = [];

  private taskListSubject = new BehaviorSubject<TaskList[]>([]);

  private hideTodoDetail = new Subject<String>();
  private addTaskInTaskListSubject = new Subject<Task>();
  private renderSidePanelSubject = new Subject<TaskList[]>();
  private showTaskDetailsSubject = new Subject<{ task: Task, action: string }>();

  constructor() {
    this.loadTaskListFromStorage();
  }

  private saveTaskListToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tasklistitems', JSON.stringify(this.tasklistitems));
    }
  }

  private loadTaskListFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('tasklistitems');
      if (data) {
        this.tasklistitems = JSON.parse(data);
        this.taskListSubject.next([...this.tasklistitems]);
      }
    }
  }

  public setTaskListItems(tasklistitems: TaskList[]) {
    this.tasklistitems = tasklistitems;
    this.saveTaskListToStorage();
  }

  public getTaskListItems(): TaskList[] {
    return this.tasklistitems;
  }

  public renderTaskList(taskList: TaskList) {
    this.taskListSubject.next([taskList]); // Wrap taskList in an array
  }

  public getHideTodoDetail() {
    return this.hideTodoDetail;
  }

  public getAddTaskInTaskListSubject() {
    return this.addTaskInTaskListSubject;
  }

  public getTaskListSubject(): Observable<TaskList[]> {
    return this.taskListSubject.asObservable();
  }

  public renderSidePanel() {
    this.renderSidePanelSubject.next(this.tasklistitems);
  }

  public getRenderSidePanelSubject() {
    return this.renderSidePanelSubject;
  }

  public addNewTaskList(newTaskList: TaskList) {
    this.tasklistitems.push(newTaskList);
    this.saveTaskListToStorage();
    this.renderSidePanelSubject.next([...this.tasklistitems]);
  }

  public deleteTaskList(id: String) {
    this.tasklistitems = this.tasklistitems.filter(taskList => taskList.id !== id);
    this.saveTaskListToStorage();
    this.renderSidePanelSubject.next(this.tasklistitems);
    if (this.tasklistitems.length === 0) {
      this.renderTaskList({ name: "", id: "", Tasks: [] });
    }
  }

  public addTaskInTaskList(newTask: Task, taskListId: string) {
    const taskListIndex = this.tasklistitems.findIndex(list => list.id === taskListId);
    if (taskListIndex !== -1) {
      newTask.date = new Date(); // Ensure date is set
      this.tasklistitems[taskListIndex].Tasks.push(newTask);
      this.saveTaskListToStorage();
      this.renderSidePanelSubject.next([...this.tasklistitems]);
      this.addTaskInTaskListSubject.next(newTask); 
    }
  }

  
  public deleteTaskInTaskList(id: String, taskListId?: String) {
    for (let i = 0; i < this.tasklistitems.length; i++) {
      if (this.tasklistitems[i].id === taskListId) {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => task.id !== id);
        break;
      } else {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => task.id !== id);
      }
    }
    this.saveTaskListToStorage();
    this.renderSidePanelSubject.next(this.tasklistitems);
  }

  public getShowTaskDetailsSubject() {
    return this.showTaskDetailsSubject;
  }
}*/ 
import { Injectable } from '@angular/core';
import TaskList from '../Types/tasklist.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Task from '../Types/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  public tasklistitems: TaskList[] = [];
  private taskListSubject = new BehaviorSubject<TaskList[]>([]);
  private hideTodoDetail = new BehaviorSubject<string>('');
  private addTaskInTaskListSubject = new BehaviorSubject<Task>(null);
  private renderSidePanelSubject = new BehaviorSubject<TaskList[]>([]);
  private showTaskDetailsSubject = new BehaviorSubject<{ task: Task, action: string }>(null);

  constructor() {
    this.loadTaskListFromStorage();
  }

  getTasks(): Observable<Task[]> {
    this.loadTasksFromStorage();
    return of(this.tasks); // Use of() to create an observable from the array
  }

  private loadTasksFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('tasks');
      if (data) {
        this.tasks = JSON.parse(data);
      }
    }
  }

  private saveTasksToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  private saveTaskListToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tasklistitems', JSON.stringify(this.tasklistitems));
    }
  }

  private loadTaskListFromStorage() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('tasklistitems');
      if (data) {
        this.tasklistitems = JSON.parse(data);
        this.taskListSubject.next([...this.tasklistitems]);
      }
    }
  }

  public setTaskListItems(tasklistitems: TaskList[]) {
    this.tasklistitems = tasklistitems;
    this.saveTaskListToStorage();
  }

  public getTaskListItems(): TaskList[] {
    return this.tasklistitems;
  }

  public renderTaskList(taskList: TaskList) {
    this.taskListSubject.next([taskList]); // Wrap taskList in an array
  }

  public getHideTodoDetail() {
    return this.hideTodoDetail;
  }

  public getAddTaskInTaskListSubject() {
    return this.addTaskInTaskListSubject;
  }

  public getTaskListSubject(): Observable<TaskList[]> {
    return this.taskListSubject.asObservable();
  }

  public renderSidePanel() {
    this.renderSidePanelSubject.next(this.tasklistitems);
  }

  public getRenderSidePanelSubject() {
    return this.renderSidePanelSubject;
  }

  public addNewTaskList(newTaskList: TaskList) {
    this.tasklistitems.push(newTaskList);
    this.saveTaskListToStorage();
    this.renderSidePanelSubject.next([...this.tasklistitems]);
  }

  public deleteTaskList(id: string) {
    this.tasklistitems = this.tasklistitems.filter(taskList => taskList.id !== id);
    this.saveTaskListToStorage();
    this.renderSidePanelSubject.next(this.tasklistitems);
    if (this.tasklistitems.length === 0) {
      this.renderTaskList({ name: "", id: "", Tasks: [] });
    }
  }

  public addTaskInTaskList(newTask: Task, taskListId: string) {
    const taskListIndex = this.tasklistitems.findIndex(list => list.id === taskListId);
    if (taskListIndex !== -1) {
      newTask.date = new Date(); // Ensure date is set
      this.tasklistitems[taskListIndex].Tasks.push(newTask);
      this.tasks.push(newTask);
      this.saveTaskListToStorage();
      this.saveTasksToStorage();
      this.renderSidePanelSubject.next([...this.tasklistitems]);
      this.addTaskInTaskListSubject.next(newTask);
    }
  }

  public deleteTaskInTaskList(id: string, taskListId?: string) {
    for (let i = 0; i < this.tasklistitems.length; i++) {
      if (this.tasklistitems[i].id === taskListId) {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => task.id !== id);
        break;
      } else {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => task.id !== id);
      }
    }
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTaskListToStorage();
    this.saveTasksToStorage();
    this.renderSidePanelSubject.next(this.tasklistitems);
  }

  public getShowTaskDetailsSubject() {
    return this.showTaskDetailsSubject;
  }

  public updateTaskImportant(taskId: string, important: boolean): Observable<void> {
    for (let taskList of this.tasklistitems) {
      const task = taskList.Tasks.find(t => t.id === taskId);
      if (task) {
        task.important = important;
        break;
      }
    }
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.important = important;
    }
    this.saveTaskListToStorage();
    this.saveTasksToStorage();
    return of(void 0);
  }
}
