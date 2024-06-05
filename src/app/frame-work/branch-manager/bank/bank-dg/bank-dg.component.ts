import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IBank } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-bank-dg',
  templateUrl: './bank-dg.component.html',
  styleUrls: ['./bank-dg.component.scss']
})
export class BankDgComponent implements OnInit {
  bankReq: IBank = {
    id: 0,
    title: '',
    code: null,
    css: '',
    isEditing: false
  }
  bankItems: any[];
  selectedBank: any;

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
  assignBanks = () => {
    this.bankItems = [
      { name: 'ibl-bsi', header: 'صادرات', code: 'bsi' },
      { name: 'ibl-mellat', header: 'ملت', code: 'mellat' },
      { name: 'ibl-tejarat', header: 'تجارت', code: 'tejarat' },
      { name: 'ibl-bmi', header: 'ملی', code: 'bmi' },
      { name: 'ibl-sepah', header: 'سپه', code: 'sepah' },
      { name: 'ibl-bki', header: 't1', code: 'bki' },
      { name: 'ibl-parsian', header: 't1', code: 'parsian' },
      { name: 'ibl-maskan', header: 't1', code: 'maskan' },
      { name: 'ibl-rb', header: 't1', code: 'rb' },
      { name: 'ibl-en', header: 't1', code: 'en' },
      { name: 'ibl-ansar', header: 't1', code: 'ansar' },
      { name: 'ibl-bpi', header: 't1', code: 'bpi' },
      { name: 'ibl-sb', header: 't1', code: 'sb' },
      { name: 'ibl-sina', header: 't1', code: 'sina' },
      { name: 'ibl-post', header: 't1', code: 'post' },
      { name: 'ibl-ghbi', header: 't1', code: 'ghbi' },
      { name: 'ibl-tt', header: 't1', code: 'tt' },
      { name: 'ibl-shahr', header: 't1', code: 'shahr' },
      { name: 'ibl-ba', header: 't1', code: 'ba' },
      { name: 'ibl-sarmayeh', header: 't1', code: 'sarmayeh' },
      { name: 'ibl-day', header: 't1', code: 'day' },
      { name: 'ibl-hi', header: 't1', code: 'hi' },
      { name: 'ibl-iz', header: 't1', code: 'iz' },
      { name: 'ibl-kar', header: 't1', code: 'kar' },
      { name: 'ibl-tourism', header: 't1', code: 'tourism' },
      { name: 'ibl-bim', header: 't1', code: 'bim' },
      { name: 'ibl-edbi', header: 't1', code: 'edbi' },
      { name: 'ibl-me', header: 't1', code: 'me' },
      { name: 'ibl-ivbb', header: 't1', code: 'ivbb' },
      { name: 'ibl-resalat', header: 't1', code: 'resalat' },
      { name: 'ibl-miran', header: 't1', code: 'miran' },
      { name: 'ibl-melal', header: 't1', code: 'melal' },
      { name: 'ibl-rb2', header: 't1', code: 'rb2' },
    ];
  }
  async onRowAdd(dataSource: IBank) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.bankAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IBank) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.bankEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.bank(this.bankReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.bankReq) : this.onRowEdit(this.bankReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.bankReq = this.config.data;
      // isEditing = true; should be last line
      this.bankReq.isEditing = true;
    }
    this.assignBanks();
  }
}