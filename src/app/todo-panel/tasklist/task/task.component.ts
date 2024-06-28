import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild, HostListener } from '@angular/core';
import Task from '../../../Types/task.model';
import { TaskcontextmenuService } from '../../../services/taskcontextmenu.service';
import { TaskService } from '../../../services/task.service';
import { Subscription } from 'rxjs';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnDestroy {

  @Input() task!: Task;
  @Input() taskListId!: string;
  @Output() deleteTaskId = new EventEmitter<string>();
  @Output() taskImportantChanged = new EventEmitter<{ taskId: string, important: boolean }>();

  @ViewChild('taskContextMenu') taskContextMenuEle!: ElementRef<HTMLDivElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @ViewChild('taskInputImportant') taskInputImportant!: ElementRef<HTMLInputElement>;
  subs: Subscription[] = [];

  constructor(private taskContextMenuService: TaskcontextmenuService,
              private taskService: TaskService) {
    const contextMenuSubscription = this.taskContextMenuService.getContextMenuSubject().subscribe(() => {
      this.closeTaskContextMenu();
    });
    this.subs.push(contextMenuSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  closeTaskContextMenu(): void {
    if (this.taskContextMenuEle.nativeElement.style.display === 'block') {
      this.taskContextMenuEle.nativeElement.style.display = 'none';
    }
  }

  deleteTask(): void {
    this.closeTaskContextMenu();
    this.taskService.deleteTaskInTaskList(this.task.id, this.taskListId);
    this.deleteTaskId.emit(this.task.id as string);
    this.taskService.getHideTodoDetail().next(this.task.id);
  }

  menuTaskComplete(checked: boolean): void {
    this.closeTaskContextMenu();
    this.taskInput.nativeElement.checked = !checked;
    this.task.done = !checked;
  }

  taskDone($event: any): void {
    this.task.done = $event?.target?.checked ?? false;
  }

  menuTaskImportant(checked: boolean): void {
    this.closeTaskContextMenu();
    this.taskInputImportant.nativeElement.checked = !checked;
    this.task.important = !checked;
    this.taskImportantChanged.emit({ taskId: this.task.id as string, important: this.task.important });
  }

  toggletaskImportant($event: any): void {
    this.task.important = !this.task.important;
    this.taskImportantChanged.emit({ taskId: this.task.id, important: this.task.important });
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent): void {
    this.taskContextMenuEle.nativeElement.style.display = 'none';
  }

  taskContextMenuFun($event: MouseEvent): void {
    this.taskContextMenuService.getContextMenuSubject().next('Task');
    $event.preventDefault();
    this.taskContextMenuEle.nativeElement.style.display = 'block';
    this.taskContextMenuEle.nativeElement.style.position = 'absolute';
    this.taskContextMenuEle.nativeElement.style.left = $event.pageX + 'px';
    this.taskContextMenuEle.nativeElement.style.top = $event.pageY + 'px';
  }

  showTaskDetails($event: any): void {
    if ($event.target.classList.contains('done') || $event.target.classList.contains('important')) return;
    this.taskService.getShowTaskDetailsSubject().next({ task: this.task, action: 'show' });
  }
} 


/*import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, HostListener } from '@angular/core';
import Task from '../../../Types/task.model';
import { TaskcontextmenuService } from '../../../services/taskcontextmenu.service';
import { TaskService } from '../../../services/task.service';
import { Subscription } from 'rxjs';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() taskListId!: string;
  @Output() deleteTaskId = new EventEmitter<string>();
  @Output() taskImportantChanged = new EventEmitter<{ taskId: string, important: boolean }>();

  @ViewChild('taskContextMenu') taskContextMenuEle!: ElementRef<HTMLUListElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @ViewChild('taskInputImportant') taskInputImportant!: ElementRef<HTMLInputElement>;
  subs: Subscription[] = [];

  constructor(private taskContextMenuService: TaskcontextmenuService,
              private taskService: TaskService) {
    const contextMenuSubscription = this.taskContextMenuService.getContextMenuSubject().subscribe(() => {
      this.closeTaskContextMenu();
    });
    this.subs.push(contextMenuSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  closeTaskContextMenu(): void {
    if (this.taskContextMenuEle.nativeElement.style.display === 'block') {
      this.taskContextMenuEle.nativeElement.style.display = 'none';
    }
  }

  toggleImportant(): void {
    this.task.important = !this.task.important;
    this.taskImportantChanged.emit({ taskId: this.task.id, important: this.task.important });
  }

  showTaskDetails(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('done') || (event.target as HTMLElement).classList.contains('important')) return;
    this.taskService.getShowTaskDetailsSubject().next({ task: this.task, action: 'show' });
  }

  openTaskContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.taskContextMenuService.getContextMenuSubject().next('Task');
    this.taskContextMenuEle.nativeElement.style.display = 'block';
    this.taskContextMenuEle.nativeElement.style.position = 'absolute';
    this.taskContextMenuEle.nativeElement.style.left = `${event.pageX}px`;
    this.taskContextMenuEle.nativeElement.style.top = `${event.pageY}px`;
  }

  toggleTaskDone(event: Event): void {
    this.task.done = (event.target as HTMLInputElement).checked;
  }

  deleteTask(): void {
    this.taskService.deleteTaskInTaskList(this.task.id, this.taskListId);
    this.deleteTaskId.emit(this.task.id);
    this.taskService.getHideTodoDetail().next(this.task.id);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.taskContextMenuEle.nativeElement.contains(target)) {
      this.closeTaskContextMenu();
    }
  }
  menuTaskComplete(checked: boolean): void {
    this.task.done = checked;
  }
  
  menuTaskImportant(checked: boolean): void {
    this.task.important = checked;
  }

}*/
