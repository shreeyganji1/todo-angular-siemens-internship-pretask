import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { v4 as  uuidv4} from 'uuid';

@Component({
  selector: 'app-newlist',
  standalone: true,
  imports: [],
  templateUrl: './newlist.component.html',
  styleUrl: './newlist.component.scss'
})

export class NewlistComponent {

  toogleAddListFlag : boolean = false;
  @ViewChild('newTaskList') newTaskList!: ElementRef<HTMLInputElement>;


  constructor(private taskService: TaskService) {

  }

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDownEsc(event: KeyboardEvent) {
    if(this.toogleAddListFlag){
      this.toogleAddListFlag = false;
    }
  }

  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDownEnter(event: KeyboardEvent) {
  if(this.toogleAddListFlag && this.newTaskList?.nativeElement.value != ''){
    this.toogleAddListFlag = false;
    this.taskService.addNewTaskList({name : this.newTaskList.nativeElement.value, Tasks : [], id: uuidv4()});
  }
}

  toggleNewTaskList($event: MouseEvent) {
    this.toogleAddListFlag = true;
    this.newTaskList?.nativeElement.focus();
  }

}
