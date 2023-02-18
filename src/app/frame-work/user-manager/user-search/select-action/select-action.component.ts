import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent {
  @Input() userAddData: any[] = [];
  // swtich case title
  switchCaseName: string = '';
  // 
  changeSwitchCase = (item: string) => {
    this.switchCaseName = item;
  }
  toggleSubItems(completed: boolean, subTask: any) {
    subTask.forEach(t => {
      t.isSelected = completed
    });
  }
  toggleSubItemsController(completed: boolean, subTask: any) {
    subTask.controllerItems.forEach(t => {
      t.actionItems.forEach(e => {
        e.isSelected = completed
      })
    });
  }

}