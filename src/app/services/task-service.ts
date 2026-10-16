import { Injectable } from '@angular/core';
import { taskModel } from '../models/task-model';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: taskModel[] = [];

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  getTasks(): taskModel[] {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return this.tasks;
  }

  toggleTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed; 
    }
  }

  addTask(newTask: taskModel): void {
    this.tasks = [newTask, ...this.tasks];
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
 
}
