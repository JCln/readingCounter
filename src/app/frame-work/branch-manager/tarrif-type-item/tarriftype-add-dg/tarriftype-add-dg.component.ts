import { BranchesService } from 'services/branches.service';
import { Component, OnInit } from '@angular/core';
import { ITarrifTypeItem } from 'interfaces/i-branch';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColumnManager } from 'src/app/classes/column-manager';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-tarriftype-add-dg',
  templateUrl: './tarriftype-add-dg.component.html',
  styleUrls: ['./tarriftype-add-dg.component.scss']
})
export class TarriftypeAddDgComponent implements OnInit {
  tarrifTypeReq: ITarrifTypeItem = {
    id: 0,
    tarrifTypeId: 0,
    tarrifCalculationMode: 0,
    title: '',
    description: '',
    isActive: true
  }
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public columnManager: ColumnManager,
    private branchesService: BranchesService
  ) { }

  close() {
    this.ref.close();
  }
  closeSuccess() {
    this.ref.close(true);
  }
  async onRowAdd(dataSource: ITarrifTypeItem) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tarriffTypeItemManagerAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.tarrifTypeItem(this.tarrifTypeReq))
      this.onRowAdd(this.tarrifTypeReq);
  }
  ngOnInit(): void {

  }
}