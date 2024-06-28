import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoPanelComponent } from "./todo-panel/todo-panel.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TaskService } from './services/task.service';
import { StepService } from './services/step.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TodoPanelComponent, SidebarComponent],
    providers: [TaskService, StepService]
})
export class AppComponent {
  title = 'todo';
}