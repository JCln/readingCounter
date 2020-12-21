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
    if (currentRoute === '/wr' || currentRoute === '/wr/db' ) {
      this.messageToShow.title = 'مشاهده نقشه و یا داشبورد';
      this.messageToShow.messageOne = '1-	امکان استفاده از دو لایه ظاهری2-	پرینت نقشه بصورت عمودی و افقی3-	بزرگ و کوچک کردن نقشه4-	بارگذاری مجدد نقشه درصورت خطا در نمایش احتمالی5-	مکان یابی6-	حذف تمامی لایه ها';
      this.messageToShow.imgOne = 'assets/imgs/help/wr1.PNG';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.imgTwo = '';
    }
    else if (currentRoute.includes('/wr/m/al/')) {
      this.messageToShow.title = 'درخت دسترسی';
      this.messageToShow.messageOne = 'باتوجه به اینکه برنامه بصورت یکپارچه و با این قابلیت که همه ی استان های کشور را پوشش دهد به صورت لایه ای درنظر گرفته شده است. قسمت درخت دسترسی از بخش های Appها، ماژول ها، کنترلر ها و اکشن ها بصورت طبقه ای تشکلیل شده است. برای مثال بخش App ها شامل برنامه های کلی درحال استفاده میباشد مانند سامانه جامع قرائت کنتور. ماژول ها از سامانه قرائت کنتور و کنترلر ها از ماژول تشکیل شده اند. مثلا کنترلر های کاربری ها و وضعیت کنتور از ماژول مدیریت قرائت تشکیل شده است و مدیریت قرائت خود یک App است.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
    }
    else if (currentRoute === '/wr/mu/edit' || currentRoute === '/wr/mu/all') {
      this.messageToShow.title = 'مشاهده و ویرایش کاربران';
      this.messageToShow.messageOne = 'این قسمت شامل بخش های مشاهده همه کاربران و افزودن کاربر جدید می‌باشد. با وارد شدن به بخش مشاهده کاربران';
      this.messageToShow.imgOne = 'assets/imgs/help/editContacts.PNG';
      this.messageToShow.messageTwo = 'اطلاعات کلی کاربران مشخص میباشد. قفل به معنای دسترسی یا عدم دسترسی کاربر به برنامه میباشد. درصورتی که کاربری به دفعات متعدد به اشتباه نام کاربری و رمز عبور را وارد کند درمدت زمان مشخصی قفل میشود و قادر به وارد شدن ندارد. مدت زمان آن نیز در قسمت سطح دسترسی قابل تنظیم می باشد.فعال یا غیر فعال بودن به معنای دسترسی کاربر به برنامه است و مدت مشخصی ندارد.اطلاعات هر کاربری میتواند ویرایش شود. ';
      this.messageToShow.imgTwo = 'assets/imgs/help/editContacts2.PNG';
      this.messageToShow.messageThree = 'ویرایش شامل:  مشخصات کاربر، دسترسی به مناطق، دسترسی به خدمات و انتخاب گروه دسترسی می‌باشد ';
    }
    else if (currentRoute === '/wr/mu/add') {
      this.messageToShow.title = 'افزودن کاربر';
      this.messageToShow.messageOne = 'افزودن کاربر : برای افزودن کاربر جدید لازم است مشخصات کاربر، دسترسی به مناطق، دسترسی به خدمات و انتخاب گروه دسترسی کامل شوند.';
      this.messageToShow.imgOne = 'assets/imgs/help/editContacts.png';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.imgTwo = '';
    }
    else if (currentRoute.includes('/wr/m/')) {
      this.messageToShow.title = 'مدیریت نواحی';
      this.messageToShow.messageOne = 'باتوجه به اینکه برنامه بصورت یکپارچه و با این قابلیت که همه ی استان های کشور را پوشش دهد به صورت لایه ای درنظر گرفته شده است.به این معنی که برای تغییر در بخش استان، به بخش استان مراجعه و با انتخاب کشور، کد استانی، نام استان و اولویت نمایش استان اقدام میشود.بطور مثال اگر استانی بنام فارس وجود داشته باشد در بخش مناطق خودگردان میتوان به اضافه کردن مناطق خودگردانی که مربوط به فارس هستند اقدام نمود.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
    }
    else if (currentRoute === '/wr/m/mc' || currentRoute === '/wr/m/mp' || currentRoute === '/wr/m/mr' || currentRoute === '/wr/m/mz') {
      this.messageToShow.title = 'مدیریت کاربران';
      this.messageToShow.messageOne = 'برای مشاهده، شخصی سازی ، کنترل نرم افزار های قرائت درنظر گرفته شده است. این قسمت شامل کنترل بخش های کاربری، تنظیمات پیش فرض، وضعیت کنتور و ... است.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
    }
    else {
      this.messageToShow.title = 'test message';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.messageOne = '';
      this.messageToShow.imgTwo = '';
    }
  }
  openDialog = () => {
    this.someName(this.router.url);

    this.dialog.open(AddNewComponent, {
      data: this.messageToShow
    });
  }

}
