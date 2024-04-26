import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ToolsService } from 'services/tools.service';
import { ENAcceptVerb, IAcceptVerb, IJsonInfo, IParamSendType } from 'interfaces/itools';
import { UtilsService } from 'services/utils.service';
import { ENSnackBarColors } from 'interfaces/enums.enum';
import { CloseTabService } from 'services/close-tab.service';


@Component({
  selector: 'app-excel-builder',
  templateUrl: './excel-builder.component.html',
  styleUrls: ['./excel-builder.component.scss']
})
export class ExcelBuilderComponent implements OnInit {
  _selectedMethod: ENAcceptVerb;
  _selectedParamSendType: ENAcceptVerb;
  _selectedJsonInfo: ENAcceptVerb;

  methods: IAcceptVerb[] = this.toolsService.methods;
  jsonInfo: IJsonInfo[] = this.toolsService.jsonInfo;
  paramSendType: IParamSendType[] = this.toolsService.paramSendType;

  constructor(
    public toolsService: ToolsService,
    public closeTabService: CloseTabService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }
  connectToServer = async () => {
    const a = await this.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.addToolsDynamicExcel, this.closeTabService.dynamicReq);
    this.toolsService.utilsService.snackBarMessageSuccess(a.message);
  }
  verification = () => {
    this.closeTabService.dynamicReq.jsonInfo = JSON.stringify(this._selectedJsonInfo);
    this.closeTabService.dynamicReq.acceptVerb = this._selectedMethod;
    this.closeTabService.dynamicReq.paramSendType = this._selectedParamSendType;

    if (this.toolsService.verificationService.verificationExcelBuilder(this.closeTabService.dynamicReq))
      this.connectToServer();

  }

}
