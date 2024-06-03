import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IVillage } from 'interfaces/i-branch';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-village-dg',
  templateUrl: './village-dg.component.html',
  styleUrls: ['./village-dg.component.scss']
})
export class VillageDgComponent implements OnInit {
  villageReq: IVillage = {
    id: 0,
    title: '',
    isMetro: false,
    logicalOrder: null,
    zoneId: null,
    isEditing: false
  }
  zoneDictionary: IDictionaryManager[] = []
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
  async onRowAdd(dataSource: IVillage) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.villageAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IVillage) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.villageEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.village(this.villageReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.villageReq) : this.onRowEdit(this.villageReq)
  }
  getDictionary = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
  }
  ngOnInit(): void {
    this.getDictionary();
    if (this.config.data) {
      this.villageReq = this.config.data;
      // isEditing = true; should be last line
      this.villageReq.isEditing = true;
    }
  }
}