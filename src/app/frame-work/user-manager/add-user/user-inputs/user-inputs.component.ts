import { CloseTabService } from 'services/close-tab.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent {
  constructor(
    public closeTabService: CloseTabService
  ) { }
}
