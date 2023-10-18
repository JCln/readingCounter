import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rl-us-select-action',
  templateUrl: './rl-us-select-action.component.html',
  styleUrls: ['./rl-us-select-action.component.scss']
})
export class RlUsSelectActionComponent {
  @Input() userAddData;

}
