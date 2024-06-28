import { Injectable } from '@angular/core';
import Step from '../Types/step.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private stepSubject = new Subject<{step: Step, action : string}>();
  private toggleContextMenuSubject = new Subject();

  constructor() { }

  getStepSubject(){
    return this.stepSubject;
  }

  getContextMenuSubject(){
    return this.toggleContextMenuSubject;
  }

}
