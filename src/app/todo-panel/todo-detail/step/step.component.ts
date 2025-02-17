import { Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import Step from '../../../Types/step.model';
import { TaskService } from '../../../services/task.service';
import { StepService } from '../../../services/step.service';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import TaskList from '../../../Types/tasklist.model'; 
@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnDestroy {
  @Input() public step!: Step;
  @ViewChild('stepContextMenu') stepContextMenuEle!: ElementRef<HTMLDivElement>;
  @ViewChild('stepDone') stepInput!: ElementRef<HTMLInputElement>;
  subs: Subscription[] = [];

  constructor(private taskService: TaskService, private stepService: StepService) {
    const contextMenuSubscription = this.stepService.getContextMenuSubject().subscribe(() => {
      this.closeStepContextMenu();
    });
    this.subs.push(contextMenuSubscription);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    this.stepContextMenuEle.nativeElement.style.display = "none";
  }

  stepDoneTD($event: any, step: Step) {
    step.done = $event?.target?.checked || false;
  }

  stepContextMenuFun($event: MouseEvent) {
    this.stepService.getContextMenuSubject().next("step");
    $event.preventDefault();
    this.stepContextMenuEle.nativeElement.style.display = "block";
    this.stepContextMenuEle.nativeElement.style.position = "absolute";
    this.stepContextMenuEle.nativeElement.style.left = `${$event.pageX}px`;
    this.stepContextMenuEle.nativeElement.style.top = `${$event.pageY}px`;
  }

  menuStepComplete(checked: boolean) {
    this.closeStepContextMenu();
    this.stepInput.nativeElement.checked = !checked;
    this.step.done = !checked;
  }

  closeStepContextMenu() {
    if (this.stepContextMenuEle.nativeElement.style.display === "block") {
      this.stepContextMenuEle.nativeElement.style.display = "none";
    }
  }

  promoteToTask($event: MouseEvent, arg1: Step) {
    this.closeStepContextMenu();
    this.deleteStep();
    const newTaskList = new TaskList();
    newTaskList.id = uuidv4();
    newTaskList.name = this.step.name!;
    newTaskList.Tasks = [{ id: uuidv4(), name: this.step.name!, done: false, important: false, date: new Date() }];
    this.taskService.getAddTaskInTaskListSubject().next([newTaskList]);
  }

  deleteStep() {
    this.stepService.getStepSubject().next({ step: this.step, action: "delete" });
  }
}
