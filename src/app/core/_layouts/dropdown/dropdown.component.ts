import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  // close drop down if clicks outside of it
  closeDropDown = () => {

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
