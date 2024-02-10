import { Component, signal } from '@angular/core';
 // Import CommonModule
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([
    'Estudiar Angular',
    'Estudiar Ionic',
    'Estudiar Ingles',
    'Estudiar Azure',
  ]);
  disabled = true;
  name = signal('Camilo Calderon');
  person = signal({
    name: 'Camilo',
    age: 32,
    avatar: 'https://picsum.photos/200/300'
  });

  colorControl = new FormControl('#ff0000');
  widthControl = new FormControl(200);
  nameControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(2)
    ]
  });

  constructor() {
    this.colorControl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  clickHandler() {
    alert('Hola!');
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keyDownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  keyUpSignalHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyDownSignalObjectHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.set({...this.person(), name: newValue});
  }

  changeSignalObjectHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = Number(input.value);
    this.person.set({...this.person(), age: newValue});
  }

}
