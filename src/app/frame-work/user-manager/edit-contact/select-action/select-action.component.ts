import { Component, Input, OnInit } from '@angular/core';
import { appItems } from 'src/app/Interfaces/iuser-manager';
import { EditContactManagerService } from 'src/app/services/edit-contact-manager.service';

@Component({
  selector: 'app-select-action',
  templateUrl: './select-action.component.html',
  styleUrls: ['./select-action.component.scss']
})
export class SelectActionComponent implements OnInit {
  @Input() addContactData: appItems[] = [];
  // swtich case title
  switchCaseName: string = '';
  // 

  constructor(private editUserManagerService: EditContactManagerService) { }

  changeSwitchCase = (item: string) => {
    this.switchCaseName = item;
  }
  addActionItems = () => {
    this.editUserManagerService.addAUserActions(this.addContactData);
  }
  ngOnInit(): void {    
  }

}
