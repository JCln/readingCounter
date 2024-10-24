import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-reading-config-dg',
  templateUrl: './reading-config-dg.component.html',
  styleUrls: ['./reading-config-dg.component.scss']
})
export class ReadingConfigDgComponent implements OnInit {
  readingConfigReq: IReadingConfigDefault = {
    id: 0,
    dynamicId: null,
    defaultHasPreNumber: false,
    isOnQeraatCode: false,
    displayBillId: false,
    displayRadif: false,
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
    zoneId: null,
    defaultAlalHesab: null,
    maxAlalHesab: null,
    minAlalHesab: null,
    defaultImagePercent: null,
    maxImagePercent: null,
    minImagePercent: null,
    lowConstBoundMaskooni: null,
    lowPercentBoundMaskooni: null,
    highConstBoundMaskooni: null,
    highPercentBoundMaskooni: null,
    lowConstBoundSaxt: null,
    lowPercentBoundSaxt: null,
    highConstBoundSaxt: null,
    highPercentBoundSaxt: null,
    lowConstZarfiatBound: null,
    lowPercentZarfiatBound: null,
    highConstZarfiatBound: null,
    highPercentZarfiatBound: null,
    lowPercentRateBoundNonMaskooni: null,
    highPercentRateBoundNonMaskooni: null,
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
  async onRowAdd(dataSource: IReadingConfigDefault) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ReadingConfigADD, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IReadingConfigDefault) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ReadingConfigEDIT, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.readingConfigDefault(this.readingConfigReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.readingConfigReq) : this.onRowEdit(this.readingConfigReq)
  }
  getDictionary = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
  }
  ngOnInit(): void {
    this.getDictionary();
    if (this.config.data) {
      this.readingConfigReq = this.config.data;
      // isEditing = true; should be last line
      this.readingConfigReq.isEditing = true;
    }
  }
}



//   form: FormGroup;
//   selected: any;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private dialogRef: MatDialogRef<RdEditDgComponent>,
//     fb: FormBuilder,
//     private utilsService: UtilsService
//   ) {
//     data = data.row;
//     this.selected = data.dynamicId;

//     this.form = fb.group({
//       id: data.id,
//       defaultHasPreNumber: data.defaultHasPreNumber,
//       isOnQeraatCode: data.isOnQeraatCode,
//       displayBillId: data.displayBillId === null ? false : data.displayBillId,
//       displayRadif: data.displayRadif === null ? false : data.displayRadif,
//       displayPreDate: data.displayPreDate === null ? false : data.displayPreDate,
//       displayMobile: data.displayMobile === null ? false : data.displayMobile,
//       hasImage: data.hasImage === null ? false : data.hasImage,
//       displayDebt: data.displayDebt === null ? false : data.displayDebt,
//       displayIcons: data.displayIcons === null ? false : data.displayIcons,
//       zoneId: data.zoneId,
//       defaultAlalHesab: data.defaultAlalHesab,
//       maxAlalHesab: data.maxAlalHesab,
//       minAlalHesab: data.minAlalHesab,
//       defaultImagePercent: data.defaultImagePercent,
//       maxImagePercent: data.maxImagePercent,
//       minImagePercent: data.minImagePercent,
//       lowConstBoundMaskooni: data.lowConstBoundMaskooni,
//       lowPercentBoundMaskooni: data.lowPercentBoundMaskooni,
//       highConstBoundMaskooni: data.highConstBoundMaskooni,
//       highPercentBoundMaskooni: data.highPercentBoundMaskooni,
//       lowConstBoundSaxt: data.lowConstBoundSaxt,
//       lowPercentBoundSaxt: data.lowPercentBoundSaxt,
//       highConstBoundSaxt: data.highConstBoundSaxt,
//       highPercentBoundSaxt: data.highPercentBoundSaxt,
//       lowConstZarfiatBound: data.lowConstZarfiatBound,
//       lowPercentZarfiatBound: data.lowPercentZarfiatBound,
//       highConstZarfiatBound: data.highConstZarfiatBound,
//       highPercentZarfiatBound: data.highPercentZarfiatBound,
//       lowPercentRateBoundNonMaskooni: data.lowPercentRateBoundNonMaskooni,
//       highPercentRateBoundNonMaskooni: data.highPercentRateBoundNonMaskooni
//     })
//   }
//   private percentValidate = (): boolean => {
//     if (!MathS.persentCheck(this.form.value.defaultAlalHesab))
//       return false;
//     if (!MathS.persentCheck(this.form.value.maxAlalHesab))
//       return false;
//     if (!MathS.persentCheck(this.form.value.minAlalHesab))
//       return false;
//     if (!MathS.persentCheck(this.form.value.defaultImagePercent))
//       return false;
//     if (!MathS.persentCheck(this.form.value.maxImagePercent))
//       return false;
//     if (!MathS.persentCheck(this.form.value.minImagePercent))
//       return false;
//     if (!MathS.persentCheck(this.form.value.lowPercentBoundMaskooni))
//       return false;
//     if (!MathS.persentCheck(this.form.value.highPercentBoundMaskooni))
//       return false;
//     if (!MathS.persentCheck(this.form.value.lowPercentBoundSaxt))
//       return false;
//     if (!MathS.persentCheck(this.form.value.highPercentBoundSaxt))
//       return false;
//     if (!MathS.persentCheck(this.form.value.lowPercentZarfiatBound))
//       return false;
//     if (!MathS.persentCheck(this.form.value.highPercentZarfiatBound))
//       return false;
//     if (!MathS.persentCheck(this.form.value.lowPercentRateBoundNonMaskooni))
//       return false;
//     if (!MathS.persentCheck(this.form.value.highPercentRateBoundNonMaskooni))
//       return false;

//     return true;
//   }
//   private zoneValidate = (): boolean => {
//     if (MathS.isNull(this.form.value.zoneId))
//       return false;
//     return true;
//   }
//   save() {
//     if (!this.percentValidate()) {
//       this.utilsService.snackBarMessageWarn(EN_messages.highLow100);
//       return;
//     }
//     if (!this.zoneValidate()) {
//       this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
//       return;
//     }
//     this.dialogRef.close(this.form.value);
//   }
//   close() {
//     this.dialogRef.close();
//   }
// }