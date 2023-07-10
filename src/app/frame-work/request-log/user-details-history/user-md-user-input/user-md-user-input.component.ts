import { ColumnManager } from 'src/app/classes/column-manager';
import { CloseTabService } from 'services/close-tab.service';
import { Component, Input } from '@angular/core';
import { IUserDetailsHistory } from 'services/DI/privacies';

@Component({
  selector: 'app-user-md-user-input',
  templateUrl: './user-md-user-input.component.html',
  styleUrls: ['./user-md-user-input.component.scss']
})
export class UserMdUserInputComponent {
  constructor(
    public closeTabService: CloseTabService,
    public columnManager: ColumnManager
  ) { }

  @Input() editInfo: IUserDetailsHistory;
}
