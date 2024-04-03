import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITarrifTypeItem } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-tarriftype-edit-dg',
  templateUrl: './tarriftype-edit-dg.component.html',
  styleUrls: ['./tarriftype-edit-dg.component.scss']
})
export class TarriftypeEditDgComponent implements OnInit {
  tarrifTypeReq: ITarrifTypeItem = {
    id: 0,
    tariffTypeId: 0,
    tariffCalculationMode: 0,
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
    console.log(this.config.data);

    this.tarrifTypeReq = this.config.data;
  }
}