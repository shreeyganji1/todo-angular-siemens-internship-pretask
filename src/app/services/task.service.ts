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
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import Task from '../Types/task.model';


interface TaskDetail {
  task: Task;
  action: String;
  taskListId: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService { 

  private tasks: Task[] = [];
  public tasklistitems: TaskList[] = [];
  private taskListSubject = new BehaviorSubject<TaskList[]>([]);
  private hideTodoDetail = new Subject<String>();
  private renderSidePanelSubject = new Subject<TaskList[]>();
  private addTaskInTaskListSubject = new BehaviorSubject<TaskList[]>([]);
  private showTaskDetailsSubject = new BehaviorSubject<TaskDetail | null>(null);

  constructor() {
    this.loadTaskListsFromLocalStorage(); // Ensure task lists are loaded on service initialization
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private loadTaskListsFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const localTaskLists = localStorage.getItem('tasklistitems');
      if (localTaskLists) {
        this.tasklistitems = JSON.parse(localTaskLists);
      }
      this.taskListSubject.next(this.tasklistitems);
    }
  }

  
  public getTaskLists(): Observable<TaskList[]> {
    return of(this.tasklistitems);
  }

  public getTaskListSubject(): BehaviorSubject<TaskList[]> {
    return this.taskListSubject;
  }

  public getTaskListItems(): TaskList[] {
    return this.tasklistitems;
  }

  public renderSidePanel(): void {
    this.renderSidePanelSubject.next(this.tasklistitems);
  }

  public getRenderSidePanelSubject(): Subject<TaskList[]> {
    return this.renderSidePanelSubject;
  }

  public addTaskInTaskList(task: Task, taskListId: string): void {
    const taskList = this.tasklistitems.find(list => list.id === taskListId);
    if (taskList) {
      taskList.Tasks.push(task);
      this.taskListSubject.next(this.tasklistitems);
      this.saveTaskListsToLocalStorage();
    }
  }

  public deleteTaskList(id: String): void {
    this.tasklistitems = this.tasklistitems.filter(taskList => taskList.id !== id);
    this.saveTaskListsToLocalStorage();
    this.renderSidePanelSubject.next(this.tasklistitems);
    if (this.tasklistitems.length === 0) {
      this.renderTaskList({ name: "", id: "", Tasks: [] });
    }
  }

  public renderTaskList(taskList: TaskList): void {
    this.taskListSubject.next([taskList]); // Wrap taskList in an array
  }

  private saveTaskListsToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('tasklistitems', JSON.stringify(this.tasklistitems));
    }
  }

  public addNewTaskList(taskList: TaskList): void {
    this.tasklistitems.push(taskList);
    this.taskListSubject.next(this.tasklistitems);
    this.saveTaskListsToLocalStorage();
  }

  public getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  public deleteTaskInTaskList(id: String, taskListId?: String): void {
    for (let i = 0; i < this.tasklistitems.length; i++) {
      if (this.tasklistitems[i].id === taskListId) {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => task.id !== id);
        break;
      } else {
        this.tasklistitems[i].Tasks = this.tasklistitems[i].Tasks.filter(task => task.id !== id);
      }
    }
    this.saveTaskListsToLocalStorage();
    this.renderSidePanelSubject.next(this.tasklistitems);
  }

  public getHideTodoDetail(): Subject<String> {
    return this.hideTodoDetail;
  }

  public getShowTaskDetailsSubject(): BehaviorSubject<TaskDetail | null> {
    return this.showTaskDetailsSubject;
  }

  public getAddTaskInTaskListSubject(): BehaviorSubject<TaskList[]> {
    return this.addTaskInTaskListSubject;
  }

  public saveImportantCountToStorage(count: number): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('importantCount', JSON.stringify(count));
    }
  }

  public getImportantCountFromStorage(): number {
    if (this.isLocalStorageAvailable()) {
      const count = localStorage.getItem('importantCount');
      return count ? JSON.parse(count) : 0;
    }
    return 0;
  }

  public updateTaskImportant(taskId: string, important: boolean): void {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].important = important;
      this.saveTasksToLocalStorage();
    }
  }

  public saveTasksToLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
