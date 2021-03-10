import { Component, EventEmitter, HostListener, Output } from '@angular/core';

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

  @HostListener('click', ['$event.target'])
  toggleDropdown(event) {
    var dropdown = document.getElementById("dropdown");

    if (event.target.classList.contains('urunler')) {
      dropdown.classList.toggle('show');
    } else {
      dropdown.classList.remove('show');
    }
  }
}
