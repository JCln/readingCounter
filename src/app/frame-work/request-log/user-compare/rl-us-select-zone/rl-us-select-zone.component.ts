import { Component, Input } from '@angular/core';
import { IUserCompareManager } from 'interfaces/iuser-manager';

@Component({
  selector: 'app-rl-us-select-zone',
  templateUrl: './rl-us-select-zone.component.html',
  styleUrls: ['./rl-us-select-zone.component.scss']
})
export class RlUsSelectZoneComponent {
  @Input() dataSource: IUserCompareManager;

  constructor(
  ) { }

}
