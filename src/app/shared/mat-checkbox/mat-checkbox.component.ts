import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
export interface IMulti {
  id: number;
  title: string;
  isChecked?: boolean;
  subCollection?: IMulti[];
}

@Component({
  selector: 'app-mat-checkbox',
  templateUrl: './mat-checkbox.component.html',
  styleUrls: ['./mat-checkbox.component.scss']
})
export class MatCheckboxComponent implements OnInit {
  allComplete: boolean = false;
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' }
    ]
  };
  constructor(

    // data: IMulti[] = [
    //   {
    //     id: 12, title: 'hello', isChecked: true, subCollection: [
    //       { id: 12, title: '1', isChecked: true },
    //       { id: 12, title: '2222', isChecked: true },
    //       { id: 12, title: '3333', isChecked: true }
    //     ]
    //   }
    // ]
  ) { }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  ngOnInit(): void {
  }
}

