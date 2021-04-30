import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp, OnDestroy {
  private params: any;

  constructor() { }
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  // refresh(params: any): boolean {
  //   throw new Error('Method not implemented.');
  // }  
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler($event) {
    // this.params.clicked(this.params.value);


    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      // this.params.clicked(params);
      this.params.onClick(params);
      console.log(params);
      

    }
  }

  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
