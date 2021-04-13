import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Output() isLogout = new EventEmitter<boolean>();
  // close drop down if clicks outside of it
  closeDropDown = () => {

  }
  logout = () => {
    this.isLogout.emit(true);
  }

}
