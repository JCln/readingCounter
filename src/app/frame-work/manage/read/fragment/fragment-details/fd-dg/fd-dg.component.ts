import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-fd-dg',
  templateUrl: './fd-dg.component.html',
  styleUrls: ['./fd-dg.component.scss']
})
export class FdDgComponent implements OnInit {
  fragmentDetailsReq: IFragmentDetails = {
    routeTitle: '',
    fromEshterak: '',
    toEshterak: '',
    fragmentMasterId: '',
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
  async onRowAdd(dataSource: IFragmentDetails) {
    const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentDETAILSADD, dataSource);
    if (res) {
      this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IFragmentDetails) {
    const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentDETAILSEDIT, dataSource);
    if (res) {
      this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.fragmentManagerService.verificationService.verificationDetails(this.fragmentDetailsReq)) {
      MathS.isNull(this.config.data.isEditing) ? this.onRowAdd(this.fragmentDetailsReq) : this.onRowEdit(this.fragmentDetailsReq)
    }
  }
  ngOnInit(): void {
    if (this.config.data.isEditing) {
      this.fragmentDetailsReq = this.config.data.data;
      // isEditing = true; should be last line
      this.fragmentDetailsReq.isEditing = true;
    }
    else {
      this.fragmentDetailsReq.fragmentMasterId = this.config.data.data;
    }
  }
}