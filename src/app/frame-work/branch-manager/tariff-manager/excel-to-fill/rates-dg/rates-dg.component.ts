
import { Component, OnInit } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-rates-dg',
  templateUrl: './rates-dg.component.html',
  styleUrls: ['./rates-dg.component.scss']
})
export class RatesDgComponent implements OnInit {
  rates: any = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public closeTabService: CloseTabService
  ) { }

  convertNumberToString() {
    for (let index = 0; index < this.rates.length; index++) {
      this.rates[index].fromRate = this.rates[index].fromRate.toString();
      this.rates[index].toRate = this.rates[index].toRate.toString();
    }
  }
  classWrapper = async () => {
    if (this.config.data) {
      this.rates = this.config.data;
      this.convertNumberToString();
    }
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  closeData(item: any) {
    this.ref.close(item);
  }
  // async emptyBeforeClose() {
  //   console.log(1);
    
  //   let haveValueNumbers: number = 0;
  //   for (let index = 0; index < this.rates.length; index++) {
  //     if (!MathS.isNull(this.rates[index].fromRate) || !MathS.isNull(this.rates[index].toRate))
  //       haveValueNumbers++;
  //   }
  //   console.log(haveValueNumbers);
    
  //   // if there is a value in any item of rates than warn user, else empty the array
  //   if (haveValueNumbers > 0) {
  //     const config = {
  //       messageTitle: `تعداد ${haveValueNumbers} نرخ تعیین شده است`,
  //       text: EN_messages.confirm_removeAll,
  //       width: '21rem',
  //       isInput: false,
  //       isDelete: true,
  //       isImportant: true,
  //       icon: 'pi pi-minus-circle'
  //     }
  //     const confirmed = await this.closeTabService.utilsService.primeConfirmDialog(config);
  //     if (confirmed) {
  //       this.rates = [];
  //       this.closeDialogWihoutData();
  //     }
  //   }
  //   else {
  //     this.rates = [];
  //     this.closeDialogWihoutData();
  //   }
  // }
  closeDialogWihoutData() {
    this.ref.close();
  }
  close() {
    console.log(1);
    
    // this.emptyBeforeClose();
  }
  addRate() {
    this.rates.unshift({ fromRate: null, toRate: null });
  }
  deleteRate(index: number) {
    this.rates.splice(index, 1);
  }
  verification(): boolean {
    for (let index = 0; index < this.rates.length; index++) {
      if (MathS.isNullTextValidation(this.rates[index].fromRate)) {
        this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.insert_fromRate);
        return false;
      }
      if (MathS.isNullTextValidation(this.rates[index].toRate)) {
        this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.insert_toRate);
        return false;
      }
      if (MathS.isNaN(Number(this.rates[index].fromRate))) {
        this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.wrong_fromRate);
        return false;
      }
      if (MathS.isNaN(Number(this.rates[index].toRate))) {
        this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.wrong_toRate);
        return false;
      }
      if (!MathS.isFromLowerThanTo(Number(this.rates[index].fromRate), Number(this.rates[index].toRate))) {
        this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.lessThan_rate);
        return false;
      }
      this.rates[index].fromRate = Number(this.rates[index].fromRate.trim());
      this.rates[index].toRate = Number(this.rates[index].toRate.trim());
    }
    return true;
  }
  accepted() {
    if (this.verification())
      this.closeData(this.rates);
  }
}
