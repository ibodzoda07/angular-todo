import { Component, inject } from '@angular/core';
import { taskModel } from '../../models/task-model';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  toaster = inject(ToastrService);
  private taskService: TaskService = inject(TaskService);

  taskTitle: string = '';
  currentFilter: string = 'all';

  editingTaskId: number | null = null;
  editText: string = '';

  deletingTaskId: number | null = null;

  get allTasks(){
    console.log('Current Tasks:', this.taskService.getTasks());
    return this.taskService.getTasks();
  }
  

  addTask(taskTitle: string): void {
    const task = this.taskTitle.trim();
    if (task) {
      const newTask: taskModel = {
        id: Date.now(), 
        description: task,
        completed: false,
        date: new Date().toISOString().split('T')[0], 
      };

      console.log('New Task:', newTask);

      this.taskService.addTask(newTask);
      this.taskTitle ='';
      
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  toggleTask(taskId: number): void {
    this.taskService.toggleTask(taskId);
  }

  filterTasks(filter: string): void {
    this.currentFilter = filter;
  }

  get filteredTasks() {
    const tasks = this.taskService.getTasks(); 

    if (this.currentFilter === 'active') {
      return tasks.filter(task => !task.completed); 
    } 
    if (this.currentFilter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    
    return tasks; 
  }

  // edit modal

  openEditModal(task: { id: number; description: string }): void {
    this.editingTaskId = task.id;
    this.editText = task.description;   }

  saveTaskEdit(): void {
    if (this.editingTaskId === null) return;
    const trimmed = this.editText.trim();
    if (!trimmed) return;

    const task = this.taskService.getTasks().find(t => t.id === this.editingTaskId);
    if (task) {
      task.description = trimmed;
    }
    this.closeEditModal();
    this.toaster.success('Задача успешно обновлена')
  }

  closeEditModal(): void {
    this.editingTaskId = null;
    this.editText = '';
  }

  // delete modal
  openDeleteModal(id: number): void {
    this.deletingTaskId = id;
  }

  confirmDelete(): void {
    if (this.deletingTaskId === null) return;
    this.taskService.deleteTask(this.deletingTaskId);
    this.closeDeleteModal();
    this.toaster.success('Задача успешно удалена!');
  }

  closeDeleteModal(): void {
    this.deletingTaskId = null;
  }
}

