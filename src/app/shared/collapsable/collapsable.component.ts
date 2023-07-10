import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss']
})
export class CollapsableComponent {
  @Input() _isCollapsed: boolean;
  @Input() _isReversed: boolean = false;
  @Input() _tooltipText: string = '';

  @Output() _clicked = new EventEmitter<any>();

  click = () => {
    this._clicked.emit(this._isCollapsed);
  }
}
