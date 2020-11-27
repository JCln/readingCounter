import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
    selector: 'checkbox-renderer',
    template: `
    <input 
      type="checkbox" 
      (click)="checkedHandler($event)"
      [checked]="params.value"
    />
`,
})
export class CheckboxRenderer implements ICellRendererAngularComp {
    params: any;
    
    agInit(params: any): void {
        this.params = params;
    }

    checkedHandler(event) {
        let checked = event.target.checked;
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    }
    refresh(params: any): boolean {
        throw new Error('Method not implemented.');
    }
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
        throw new Error('Method not implemented.');
    }

}
