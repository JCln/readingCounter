import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITag } from 'interfaces/i-branch';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tag-dg',
  templateUrl: './tag-dg.component.html',
  styleUrls: ['./tag-dg.component.scss']
})
export class TagDgComponent implements OnInit {
  tagReq: ITag = {
    id: 0,
    title: '',
    titleEn: '',
    isActive: false,
    isEditing: false
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
  async onRowAdd(dataSource: ITag) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.TagAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: ITag) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.TagEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    console.log(this.tagReq);

    if (this.branchesService.verificationService.tagManager(this.tagReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.tagReq) : this.onRowEdit(this.tagReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.tagReq = this.config.data;
      // isEditing = true; should be last line
      this.tagReq.isEditing = true;
    }
  }
}