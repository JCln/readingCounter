import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentMaster } from 'interfaces/ireads-manager';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Converter } from 'src/app/classes/converter';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-fragment-add-dg',
  templateUrl: './fragment-add-dg.component.html',
  styleUrls: ['./fragment-add-dg.component.scss']
})
export class FragmentAddDgComponent implements OnInit {
  zoneDictionary: IDictionaryManager[] = [];
  fragmentReq = {
    zoneId: null,
    routeTitle: '',
    fromEshterak: '',
    toEshterak: '',
    changableZoneId: '',
    isValidated: false,
    isEditing: false
  }
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public columnManager: ColumnManager,
    private fragmentManagerService: FragmentManagerService
  ) { }

  close() {
    this.ref.close();
  }
  closeSuccess() {
    this.ref.close(true);
  }
  async onRowAdd(dataSource: IFragmentMaster) {
    const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTERADD, dataSource);
    if (res) {
      this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IFragmentMaster) {
    const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTEREDIT, dataSource);
    if (res) {
      this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    this.fragmentReq.fromEshterak = Converter.persianToEngNumbers(this.fragmentReq.fromEshterak);
    this.fragmentReq.toEshterak = Converter.persianToEngNumbers(this.fragmentReq.toEshterak);
    if (this.fragmentManagerService.verificationService.masterValidation(this.fragmentReq)) {
      MathS.isNull(this.config.data) ? this.onRowAdd(this.fragmentReq) : this.onRowEdit(this.fragmentReq)
    }
  }
  getDictionary = async () => {
    this.zoneDictionary = await this.fragmentManagerService.dictionaryWrapperService.getZoneDictionary();
  }
  ngOnInit(): void {
    this.getDictionary();
    if (this.config.data) {
      this.fragmentReq = this.config.data;
      // isEditing = true; should be last line
      this.fragmentReq.isEditing = true;
    }
  }
}