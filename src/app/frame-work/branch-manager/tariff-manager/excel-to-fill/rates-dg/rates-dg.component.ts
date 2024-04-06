
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

  classWrapper = async () => {
    if (this.config.data) {
      this.rates = this.config.data;
    }
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  closeData(item: any) {
    this.ref.close(item);
  }
  close() {
    this.ref.close();
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
