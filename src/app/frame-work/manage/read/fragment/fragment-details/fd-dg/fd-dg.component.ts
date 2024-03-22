import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-fd-dg',
  templateUrl: './fd-dg.component.html',
  styleUrls: ['./fd-dg.component.scss']
})
export class FdDgComponent implements OnInit {
  routeTitle: IFragmentDetails = {
    routeTitle: '',
    fromEshterak: '',
    toEshterak: '',
    fragmentMasterId: '',
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
  verification = () => {
    if (this.fragmentManagerService.verificationDetails(this.routeTitle))
      this.onRowAdd(this.routeTitle);
  }
  ngOnInit(): void {
    this.routeTitle.fragmentMasterId = this.config.data;
  }
}