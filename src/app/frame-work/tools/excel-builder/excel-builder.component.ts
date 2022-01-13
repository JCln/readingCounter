import { Component, OnInit } from '@angular/core';
import { ENSnackBarColors } from 'interfaces/ioverall-config';
import { ToolsService } from 'services/tools.service';
import {
  ENAcceptVerb,
  ENJsonInfo,
  ENParamSendType,
  IAcceptVerb,
  IJsonInfo,
  IParamSendType,
} from 'src/app/Interfaces/itools';

import { ENInterfaces } from './../../../Interfaces/en-interfaces.enum';

@Component({
  selector: 'app-excel-builder',
  templateUrl: './excel-builder.component.html',
  styleUrls: ['./excel-builder.component.scss']
})
export class ExcelBuilderComponent implements OnInit {
  _selectedMethod: ENAcceptVerb;
  _selectedParamSendType: ENAcceptVerb;
  _selectedJsonInfo: ENAcceptVerb;

  methods: IAcceptVerb[] = [
    { id: 1, name: 'DELETE', method: ENAcceptVerb.DELETE },
    { id: 2, name: 'PUT', method: ENAcceptVerb.PUT },
    { id: 3, name: 'POST', method: ENAcceptVerb.POST },
    { id: 4, name: 'GET', method: ENAcceptVerb.GET },
  ];
  jsonInfo: IJsonInfo[] = [
    { id: 1, name: 'fromDate', value: ENJsonInfo.fromDate },
    { id: 2, name: 'toDate', value: ENJsonInfo.toDate },
    { id: 3, name: 'karbari', value: ENJsonInfo.karbari },
    { id: 4, name: 'masraf', value: ENJsonInfo.masraf },
    { id: 5, name: 'zoneId', value: ENJsonInfo.zoneId },
  ];
  paramSendType: IParamSendType[] = [
    { id: 1, name: 'fromBody ', type: ENParamSendType.fromBody },
    { id: 2, name: 'fromForm ', type: ENParamSendType.fromForm },
    { id: 3, name: 'fromQuery ', type: ENParamSendType.fromQuery },
    { id: 4, name: 'fromURI ', type: ENParamSendType.fromURI },
  ];
  constructor(
    public toolsService: ToolsService
  ) { }

  ngOnInit(): void {
  }
  connectToServer = async () => {
    const a = await this.toolsService.postDataSource(ENInterfaces.addToolsDynamicExcel, this.toolsService.dynamicReq);
    this.toolsService.showSnack(a.message, ENSnackBarColors.success);
  }
  verification = () => {
    this.toolsService.dynamicReq.jsonInfo = JSON.stringify(this._selectedJsonInfo);
    this.toolsService.dynamicReq.acceptVerb = this._selectedMethod;
    this.toolsService.dynamicReq.paramSendType = this._selectedParamSendType;

    console.log(this.toolsService.dynamicReq);
    this.connectToServer();

  }

}
