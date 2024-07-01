import { Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import Task from '../../Types/task.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import Step from '../../Types/step.model';
import { FooterComponent } from './footer/footer.component';
import { StepComponent } from './step/step.component';
import { StepService } from '../../services/step.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [ DatePipe, FormsModule, FooterComponent, StepComponent],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnDestroy {

  @Input() task: Task;
  @Input() taskListId: string;

  @ViewChild('todo-detail')
  todoDetail!: ElementRef<HTMLDivElement>;
  toggleAddStepFlag: boolean = false;

  @ViewChild('stepInput')
  stepInputField!: ElementRef<HTMLInputElement>;

  @ViewChild('stepDone')
  stepDoneField!: ElementRef<HTMLInputElement>;

  subs: Subscription[] = [];

  constructor(private taskService: TaskService, private stepService: StepService) {
    const stepServiceSubscription = this.stepService.getStepSubject().subscribe(stepAction => {
      if (stepAction.action === "delete") {
        this.deleteStepFromTask(stepAction.step.id);
      }
    });

    // hide todo detail if the active item is deleted in tasklist.
    const hideTodoDetailSubscription = this.taskService.getHideTodoDetail().subscribe(id => {
      if (id == this.task.id) {
        this.closeTodoDetail();
      }
    });

    this.subs.push(stepServiceSubscription);
    this.subs.push(hideTodoDetailSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  closeTodoDetail($event?: MouseEvent) {
    this.taskService.getShowTaskDetailsSubject().next({
      task: this.task,
      action: 'hide',
      taskListId: this.taskListId // Replace with appropriate variable
    });
    
  }

  taskImportantTD($event: any) {
    this.task.important = $event?.target?.checked || false;
  }

  taskDoneTD($event: any) {
    this.task.done = $event?.target?.checked || false;
  }

  toggleAddStep(event: any) {
    this.toggleAddStepFlag = true;
    this.stepInputField?.nativeElement.focus();
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.toggleAddStepFlag = false;
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
    if (this.stepInputField && this.stepInputField.nativeElement.value != '') {
      if (typeof this.task.steps == "undefined") {
        this.task.steps = [{ id: uuidv4(), name: this.stepInputField.nativeElement.value, done: false }];
      } else {
        this.task.steps?.push({ id: uuidv4(), name: this.stepInputField.nativeElement.value, done: false });
      }
      this.toggleAddStepFlag = false;
    }
  }

  deleteStepFromTask(id: string) {
    this.task.steps = this.task.steps?.filter(step => step.id != id);
  }
}


