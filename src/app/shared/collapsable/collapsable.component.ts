import { Component, Input } from '@angular/core';

export enum ENPosition {
  absolute = 'absolute',
  relative = 'relative'
}
@Component({
  selector: 'app-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss']
})
export class CollapsableComponent {
  @Input() _isCollapsed: boolean;
  @Input() _position: ENPosition = ENPosition.absolute;

  // @Output() 
}
