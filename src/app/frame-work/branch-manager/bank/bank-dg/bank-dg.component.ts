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
      { name: 'ibl32 ibl-bsi', header: 'صادرات', code: 'bsi' },
      { name: 'ibl32 ibl-mellat', header: 'ملت', code: 'mellat' },
      { name: 'ibl32 ibl-tejarat', header: 'تجارت', code: 'tejarat' },
      { name: 'ibl32 ibl-bmi', header: 'ملی', code: 'bmi' },
      { name: 'ibl32 ibl-sepah', header: 'سپه', code: 'sepah' },
      { name: 'ibl32 ibl-bki', header: 'کشاورزی', code: 'bki' },
      { name: 'ibl32 ibl-parsian', header: 'پارسیان', code: 'parsian' },
      { name: 'ibl32 ibl-maskan', header: 'مسکن', code: 'maskan' },
      { name: 'ibl32 ibl-rb', header: 'رفاه کارگران', code: 'rb' },
      { name: 'ibl32 ibl-en', header: 'اقتصاد نوین', code: 'en' },
      { name: 'ibl32 ibl-ansar', header: 'انصار', code: 'ansar' },
      { name: 'ibl32 ibl-bpi', header: 'پاسارگاد', code: 'bpi' },
      { name: 'ibl32 ibl-sb', header: 'سامان', code: 'sb' },
      { name: 'ibl32 ibl-sina', header: 'سینا', code: 'sina' },
      { name: 'ibl32 ibl-post', header: 'پست بانک', code: 'post' },
      { name: 'ibl32 ibl-ghbi', header: 'قوامین', code: 'ghbi' },
      { name: 'ibl32 ibl-tt', header: 'توسعه تعاون', code: 'tt' },
      { name: 'ibl32 ibl-shahr', header: 'شهر', code: 'shahr' },
      { name: 'ibl32 ibl-ba', header: 'آینده', code: 'ba' },
      { name: 'ibl32 ibl-sarmayeh', header: 'سرمایه', code: 'sarmayeh' },
      { name: 'ibl32 ibl-day', header: 'دی', code: 'day' },
      { name: 'ibl32 ibl-hi', header: 'حکمت ایرانیان', code: 'hi' },
      { name: 'ibl32 ibl-iz', header: 'ایران زمین', code: 'iz' },
      { name: 'ibl32 ibl-kar', header: 'کار آفرین', code: 'kar' },
      { name: 'ibl32 ibl-tourism', header: 'گردشگری', code: 'tourism' },
      { name: 'ibl32 ibl-bim', header: 'صنعت و معدن', code: 'bim' },
      { name: 'ibl32 ibl-edbi', header: 'توسعه صادرات ایران', code: 'edbi' },
      { name: 'ibl32 ibl-me', header: 'خاورمیانه', code: 'me' },
      { name: 'ibl32 ibl-ivbb', header: 'مشترک ایران و ونزوئلا', code: 'ivbb' },
      { name: 'ibl32 ibl-resalat', header: 'رسالت', code: 'resalat' },
      { name: 'ibl32 ibl-miran', header: 'مهر ایران', code: 'miran' },
      { name: 'ibl32 ibl-melal', header: 'موسسعه اعتباری ملل', code: 'melal' },
      { name: 'ibl32 ibl-rb2', header: 'رفاه کارگران 2', code: 'rb2' },
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