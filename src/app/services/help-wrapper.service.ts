import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddNewComponent } from '../frame-work/manage/add-new/add-new.component';

@Injectable({
  providedIn: 'root'
})
export class HelpWrapperService {
  private messageToShow = {
    title: '',
    messageOne: '',
    messageTwo: '',
    messageThree: '',
    imgOne: '',
    imgTwo: ''
  }

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  private someName = (currentRoute: string) => {
    switch (currentRoute) {
      case '/wr':
        this.messageToShow.title = 'مشاهده نقشه و یا داشبورد';
        this.messageToShow.messageOne = '1-	امکان استفاده از دو لایه ظاهری2-	پرینت نقشه بصورت عمودی و افقی3-	بزرگ و کوچک کردن نقشه4-	بارگذاری مجدد نقشه درصورت خطا در نمایش احتمالی5-	مکان یابی6-	حذف تمامی لایه ها';
        this.messageToShow.imgOne = 'assets/imgs/help/wr1.PNG';
        break;
      case '/wr/m/al/ap' || '/wr/m/al/me' || '/wr/m/al/cr' || '/wr/m/al/ac':
        this.messageToShow.title = 'درخت دسترسی';
        this.messageToShow.messageOne = '';
        this.messageToShow.imgOne = '';
        break;
      case 'ma':
        this.messageToShow.title = '';
        break;
      case 'kardex':
        this.messageToShow.title = '';
        break;
      case 'installment':
        this.messageToShow.title = '';
        break;
      case 'myInfo':
        this.messageToShow.title = '';
        break;
      case 'elcs':
        this.messageToShow.title = '';
        break;
      case 'cs':
        this.messageToShow.title = '';
        break;
      case 'registerNew':
        this.messageToShow.title = '';
        break;
      case 'receipt':
        this.messageToShow.title = '';
        break;
      case 'bar':
        this.messageToShow.title = '';
        break;

      default:
        this.openDialog();
        break;
    };

  }
  openDialog = () => {
    this.someName(this.router.url);
    console.log(this.messageToShow);

    this.dialog.open(AddNewComponent, {
      data: this.messageToShow
    });
  }

}
