import { Component, computed, signal, effect } from '@angular/core';
 // Import CommonModule
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  });

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(4)]
  });


  addTaskHandler() {
    if(this.newTaskControl.valid){
      const value = this.newTaskControl.value;
      if(value.trim().length > 0){
        this.addTask(value);
        this.newTaskControl.reset();
      }
    }
  }
  addTask(title: string) {
    const task: Task = {
      id: Date.now(),
      title: title,
      completed: false
    };
    this.tasks.update(tasks => [...tasks, task]);
  }

  deleteTaskHandler(index: number) {
    this.tasks.update(tasks => tasks.filter((_, i) => i !== index));
  }

  changeStatusTaskHandler(index: number) {

    this.tasks.update(tasks => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    }));
  }

  doubleClickTaskHandler(index: number) {
    this.tasks.update(tasks => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          editing: true
        };
      }
      return {
        ...task,
        editing: false
      };
    }));
  }
  editTaskHandler(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(tasks => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          title: input.value,
          editing: false
        };
      }
      return task;
    }));
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
