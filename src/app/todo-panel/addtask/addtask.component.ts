import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import Task from '../../Types/task.model';
import TaskList from '../../Types/tasklist.model';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [],
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})

export class AddtaskComponent implements OnInit, OnDestroy {
  toggleAddTaskFlag: boolean = false;
  @ViewChild('newtask', { static: false }) newTaskInput!: ElementRef;
  taskList: TaskList = new TaskList(); // Initialize taskList

  private subs: Subscription[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const taskListSubscription = this.taskService.getTaskListSubject().subscribe((taskLists) => {
      if (taskLists.length > 0) {
        this.taskList = taskLists[0]; // Assuming there's only one task list for now
      }
    });
    this.subs.push(taskListSubscription);
  }


  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  toggleAddTask(event: any) {
    if (this.taskList.Tasks.length === 0 && this.taskList.id == "") return;
    this.toggleAddTaskFlag = true;
    this.newTaskInput?.nativeElement.focus();
  }


  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.toggleAddTaskFlag = false;
  }
  
  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (event.keyCode !== 13) return;

    if (this.toggleAddTaskFlag && this.newTaskInput.nativeElement.value) {
      this.toggleAddTaskFlag = false;
      const newTask: Task = {
        id: 'unique-task-id',
        name: 'New Task',
        date: new Date(),
        done: false,
        important: false
      };
     
    
      //this.taskList.Tasks.push({name: this.newTaskInput.nativeElement.value, done: false,important: false, id: uuidv4(), date: new Date()});

      // Update the task list in service
     // this.taskService.addTaskInTaskList(newTask, this.taskList.id);


      this.taskService.addTaskInTaskList({name: this.newTaskInput.nativeElement.value, done: false,important: false, id: uuidv4(), date: new Date()},this.taskList.id);
      // Optionally, update local storage (if needed)
      // const storedTaskList = localStorage.getItem('taskList');
      // let tasks: Task[] = storedTaskList ? JSON.parse(storedTaskList) : [];
      // tasks.push(newTask);
      // localStorage.setItem('taskList', JSON.stringify(tasks));
    }
  }
}



/*import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import Task from '../../Types/task.model';
import TaskList from '../../Types/tasklist.model';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addtask',
  standalone: true,
  imports: [],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.scss'
})
export class AddtaskComponent implements OnDestroy{

  toggleAddTaskFlag : boolean = false;
  @ViewChild('newtask', { static: false }) newTaskInput!: ElementRef;
  taskList!: TaskList;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService){
    const addTaskInTaskListSubscription = this.taskService.getAddTaskInTaskListSubject().subscribe(task => {
      this.taskList.Tasks.push(task);
    })
    this.subs.push(addTaskInTaskListSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    const taskListSubscription = this.taskService.getTaskListSubject().subscribe((tasks) => {this.taskList=tasks;});
    this.subs.push(taskListSubscription);
  }

  toggleAddTask(event: any){
    if(this.taskList.Tasks.length === 0 && this.taskList.id == "") return;
    this.toggleAddTaskFlag = true;
    this.newTaskInput?.nativeElement.focus();
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.toggleAddTaskFlag = false;
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if(this.toggleAddTaskFlag && this.newTaskInput.nativeElement.value){
      this.toggleAddTaskFlag = false;
      this.taskList.Tasks.push({name: this.newTaskInput.nativeElement.value, done: false,important: false, id: uuidv4(), date: new Date()});
    }
  }


}*/

