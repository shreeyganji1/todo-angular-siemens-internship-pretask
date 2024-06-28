import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskcontextmenuService {

  private toggleContextMenuSubject = new Subject();

  getContextMenuSubject(){
    return this.toggleContextMenuSubject;
  }

  constructor() { }
}
