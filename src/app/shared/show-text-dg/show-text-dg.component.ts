import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-show-text-dg',
  templateUrl: './show-text-dg.component.html',
  styleUrls: ['./show-text-dg.component.scss']
})
export class ShowTextDgComponent {

  constructor(
    public config: DynamicDialogConfig
  ) { }


}
