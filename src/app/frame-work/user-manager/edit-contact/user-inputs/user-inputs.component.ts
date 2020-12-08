import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/Interfaces/iuser-manager';
import { EditContactManagerService } from 'src/app/services/edit-contact-manager.service';


@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.scss']
})
export class UserInputsComponent implements OnInit {
  @Input() editInfo: IUserInfo;

  constructor(private editUserManagerService: EditContactManagerService) {

  }
  submit = () => {
    this.editUserManagerService.addAUserPersonalInfo(this.editInfo);
  }
  ngOnInit(): void {
  }
}
