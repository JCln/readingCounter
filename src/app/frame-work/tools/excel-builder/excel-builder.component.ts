import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors } from 'interfaces/ioverall-config';
import { ToolsService } from 'services/tools.service';
import { ENAcceptVerb, IAcceptVerb, IJsonInfo, IParamSendType } from 'src/app/Interfaces/itools';


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

    if (this.toolsService.verificationExcelBuilder(this.toolsService.dynamicReq))
      this.connectToServer();

  }

}
