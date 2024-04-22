import { CloseTabService } from 'services/close-tab.service';
import { Component } from '@angular/core';
import { FactoryONE } from 'src/app/classes/factory';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent extends FactoryONE {
  constructor(
    public closeTabService: CloseTabService
  ) {
    super();
  }
  classWrapper = async () => void {

  }
  doCalculate = async () => {
    console.log(this.closeTabService.caculationReq);
    console.log(await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculation, this.closeTabService.caculationReq));
  }


}
