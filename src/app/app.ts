import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tasks } from './components/tasks/tasks';
import { taskModel } from './models/task-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo');
}
