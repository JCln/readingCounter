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

  /* STATIC ROUTE S*/
  private someName = (currentRoute: string) => {
    if (currentRoute === '/wr' || currentRoute === '/wr/db') {
      this.messageToShow.title = 'مشاهده نقشه و یا داشبورد';
      this.messageToShow.messageOne = '1-	امکان استفاده از دو لایه ظاهری2-	پرینت نقشه بصورت عمودی و افقی3-	بزرگ و کوچک کردن نقشه4-	بارگذاری مجدد نقشه درصورت خطا در نمایش احتمالی5-	مکان یابی6-	حذف تمامی لایه ها';
      this.messageToShow.imgOne = 'assets/imgs/help/wr1.PNG';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/mu/edit' || currentRoute === '/wr/mu/all') {
      this.messageToShow.title = 'مشاهده و ویرایش کاربران';
      this.messageToShow.messageOne = 'این قسمت شامل بخش های مشاهده همه کاربران و افزودن کاربر جدید می‌باشد.';
      this.messageToShow.imgOne = 'assets/imgs/help/edit/editContacts.PNG';
      this.messageToShow.messageTwo = ' بخش مشاهده کاربران، اطلاعات کلی و ویرایش کاربران در دسترس میباشد. سه آیکن سمت چپ مربوط به ویرایش اطلاعات کاربر، جزئیات ورود های قبلی و تنظیمات بیشتر کاربر میباشد. تنظیمات بیشتر برای فعال سازی، غیرفعال سازی و بازنشانی رمز عبور میباشد.';
      this.messageToShow.messageThree = 'بازنشانی بمعنای تغییر رمز عبور به شماره موبایل کابر است.قفل به معنای دسترسی یا عدم دسترسی کاربر به برنامه میباشد. درصورتی که کاربری به دفعات متعدد به اشتباه نام کاربری و گذرواژه را وارد کند در مدت زمان مشخصی قفل میشود و قادر به ورود نخواهد بود. مدت زمان آن نیز در قسمت سطح دسترسی قابل تنظیم می باشد.فعال یا غیر فعال بودن به معنای دسترسی کاربر به برنامه است و مدت مشخصی ندارد.اطلاعات هر کاربری میتواند ویرایش شود';
      this.messageToShow.imgTwo = 'assets/imgs/help/editContacts2.PNG';
      return;
    }

    else if (currentRoute === '/wr/mu/add') {
      this.messageToShow.title = 'افزودن کاربر';
      this.messageToShow.messageOne = 'افزودن کاربر : برای افزودن کاربر جدید لازم است مشخصات کاربر، دسترسی به مناطق، دسترسی به خدمات و انتخاب گروه دسترسی کامل شوند.';
      this.messageToShow.imgOne = 'assets/imgs/help/edit/editContacts.png';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/mr' || currentRoute === '/wr/m/mp' || currentRoute === '/wr/m/mzd' || currentRoute === '/wr/m/mz' || currentRoute === '/wr/m/mc') {
      this.messageToShow.title = 'مدیریت کاربران';
      this.messageToShow.messageOne = 'برای مشاهده، شخصی سازی ، کنترل نرم افزار های قرائت درنظر گرفته شده است. این قسمت شامل کنترل بخش های کاربری، تنظیمات پیش فرض، وضعیت کنتور و ... است.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/apk') {
      this.messageToShow.title = 'مدیریت apk';
      this.messageToShow.messageOne = 'این بخش به دو بخش نسخه های گذشته و جدید تقسیم میشود. درصورتی که نیاز به استفاده از apk قبلی بود میتوان برروی فایل مربوط به همان سطر کلیک تا به عنوان نسخه جدید درنظر گرفته شود. برای ایجاد نسخه جدید با وارد کردن نام، شماره و فایل نسخه میتوان به ایجاد نسخه جدید اقدام نمود. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/imd') {
      this.messageToShow.title = 'ایجاد مسیر';
      this.messageToShow.messageOne = 'این بخش جهت ایجاد مسیر برای مامورین قرائت درنظر گرفته شده است. از دو طریق میتوان مسیری ایجاد کرد. یک: از طریق دوره زمانی دو: بر اساس تاریخ تنها کافیست موارد مربوطه کامل شود تا مسیری ایجاد گردد.';
      this.messageToShow.imgOne = 'assets/imgs/help/tracking/impd1.JPG';
      this.messageToShow.messageTwo = 'نکته: امکان ویرایش مقادیر مانند درصد علی الحساب و درصد تصویر وجود دارد';
      this.messageToShow.messageThree = 'نکته: تا زمانی که پیامی به شکل زیر نمایش داده نشده، مسیری ایجاد نشده است.';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/dbf') {
      this.messageToShow.title = 'دانلود خروجی';
      this.messageToShow.messageOne = 'برای دریافت فایل های متعدد(dbf) از این بخش میتوان اقدام کرد';
      this.messageToShow.imgOne = 'assets/imgs/help/dbf/dbf.JPG';
      this.messageToShow.messageTwo = 'کافی است پس از وارد کردن بازه زمانی مدنظر فایل بارگیری را داشت.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/fbn') {
      this.messageToShow.title = 'اطلاعات غیرمجاز';
      this.messageToShow.messageOne = 'کل اطلاعات غیرمجاز در این بخش ثبت میشود. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'اطلاعاتی که توسط مامورین قرائت ثبت شده قابل پیگیری می باشد.';
      this.messageToShow.messageThree = 'همچنین درصورتی که عکسی ارسال شده باشد با کلیک برروی آیکن مربوطه قابل مشاهده است.';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/track/fwu') {
      this.messageToShow.title = 'پیگیری درخواست ها';
      this.messageToShow.messageOne = 'این بخش جهت پیگیری کلیه مسیر های ایجاد شده در بخش کارتابل ایجاد شده است. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'جزئیات نمایشی بیشتر مانند تاریخ ثبت، نام مامور و وضعیت پیگیری قابل مشاهده هستند.';
      this.messageToShow.messageThree = 'همچنین میتوان مسیر را به قسمت قبلی بازگشت داد. برای مثال اگر مسیر در وضعیت درحال قرائت باشد میتواند به وضعیت بارگیری شده بازگشت داده شود.';
      this.messageToShow.imgTwo = '';
      return;
    }


    /* DYNAMIC OR INCLUDES ROUTE S */

    else if (currentRoute.includes('/wr/m/al/')) {
      this.messageToShow.title = 'درخت دسترسی';
      this.messageToShow.messageOne = 'باتوجه به اینکه برنامه بصورت یکپارچه و با این قابلیت که همه ی استان های کشور را پوشش دهد به صورت لایه ای درنظر گرفته شده است. قسمت درخت دسترسی از بخش های Appها، ماژول ها، کنترلر ها و اکشن ها بصورت طبقه ای تشکلیل شده است. برای مثال بخش App ها شامل برنامه های کلی درحال استفاده میباشد مانند سامانه جامع قرائت کنتور. ماژول ها از سامانه قرائت کنتور و کنترلر ها از ماژول تشکیل شده اند. مثلا کنترلر های کاربری ها و وضعیت کنتور از ماژول مدیریت قرائت تشکیل شده است و مدیریت قرائت خود یک App است.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/wr/mu/edit')) {
      this.messageToShow.title = 'ویرایش کاربر';
      this.messageToShow.messageOne = 'این قسمت به ویرایش اطلاعات شخصی کاربر مانند نام کاربری یا کد کاربری، نواحی قابل دسترس کاربر، سطح دسترسی ها و نقش کاربر تقسیم میشود. دسترسی به خدمات کاربر در این قسمت مشخص میشود. زیر بخش نواحی برای دسترسی به ناحیه مدنظر کاربر درنظر گرفته شده است.';
      this.messageToShow.imgOne = 'assets/imgs/help/edit/edit1.JPG';
      this.messageToShow.messageTwo = 'زیر بخش سطح دسترسی به خدمات شامل اپلیکیشن قرائت ، مدیریت سامانه و سامانه قرائت کنتور است که محدود کننده سطح دسترسی به کاربر است';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = 'assets/imgs/help/edit/edit2.JPG';
      return;
    }
    else if (currentRoute.includes('/wr/m/track/offloaded/offloadMfy')) {
      this.messageToShow.title = 'اصلاح';
      this.messageToShow.messageOne = 'برای اصلاح، میتوان باتوجه به عکس(ها) و یا صوت ارسال شده نسبت به ویرایش اقدام کرد.';
      this.messageToShow.imgOne = 'assets/imgs/help/offloadmodify/modify.JPG';
      this.messageToShow.messageTwo = 'درصورت کلیک برروی هر عکس میتوان بزرگ شده هرکدام از تصاویر را مشاهده نمود.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/wr/m/track/offloaded')) {
      this.messageToShow.title = 'بارگذاری شده';
      this.messageToShow.messageOne = 'زمانی که مامور پس از پایان قرائت انجام شده اقدام به بارگذاری(تخلیه) مینماید، مسیر به این قسمت (بارگذار شده) منتقل میشود. درصورتی که مسیر به اصلاح نیاز داشت برروی آیکن مشاهده(اصلاح) لیست کلیک نمایید ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/m/l/all/true/')) {
      this.messageToShow.title = 'لیست بارگذاری شده';
      this.messageToShow.messageOne = 'کلیه اطلاعات قرائت شده (تخلیه شده) توسط مامور قرائت در این قسمت قابل مشاهده و اصلاح می باشد. برای اصلاح بروی آیکن اصلاح کلیک تا به صفحه اصلاح منتقل شوید';
      this.messageToShow.imgOne = 'assets/imgs/help/offloadmodify/allmodify.JPG';
      this.messageToShow.messageTwo = '';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/wr/m/track')) {
      this.messageToShow.title = 'مدیریت پیگیری ها';
      this.messageToShow.messageOne = 'این بخش جهت ردیابی کلیه عملیات قرائت می باشد.';
      this.messageToShow.imgOne = 'assets/imgs/help/tracking/reading1.JPG';
      this.messageToShow.messageTwo = 'از زمانی که مسیری ایجاد میشود، مسیر ایجاد شده در قسمت صادر شده قرار میگیرد. به محض آنکه از طریق اپلیکیشن قرائت بارگیری انجام گیرد، مسیر به قسمت دریافت شده منتقل میشود. پس از آن با ثبت اولین اشتراک توسط مامور به قسمت در حال قرارئت منتقل و قابل پیگیری همزمان خواهد شد. و پس از پایان قرائت و بارگذاری عملیات به بارگذاری شده و درصورت بارگیری به مرحله آخر یعنی دانلود شده منتقل خواهد شد';
      this.messageToShow.messageThree = 'در هر قسمت امکان مشاهده و ویرایش مراحل درنظر گرفته شده است. برای مثال در قسمت در حال قرائت امکان پیگیری لیست درحال قرائت و مشاهده درلحظه آنها برروی نقشه، مشاهده مامور ها و جزئیات اطلاعات بیشتر آنها و همچنین مشاهده و بررسی تصویر و صوت های ارسال شده توسط مامور وجود دارد';
      this.messageToShow.imgTwo = 'assets/imgs/help/tracking/reading2.JPG';
      return;
    }
    else if (currentRoute.includes('exm/details') || currentRoute.includes('mam/trv') || currentRoute.includes('mam/trvch') || currentRoute.includes('mam/karkard') || currentRoute.includes('mam/karkardDaily') || currentRoute.includes('mam/dh') || currentRoute.includes('mam/gis')) {
      this.messageToShow.title = 'گزارشات';
      this.messageToShow.messageOne = 'این بخش جهت گزارش گیری از بخش هایی مانند کارکرد روزانه، پیمایشات و .. میباشد. ';
      this.messageToShow.imgOne = 'assets/imgs/help/rr/rr1.JPG';
      this.messageToShow.messageTwo = 'در هر قسمت با وارد کردن مقادیر خواسته شده براساس تاریخ و یا دوره میتوان گزارش ها و گاهی نمودار مناسب آن بخش را مشاهده کرد';
      this.messageToShow.messageThree = 'در صورت اشتباه در وارد کردن مقادیر، سیستم بطور خودکار پیامی برای اصلاح موارد لازم نمایش خواهد داد.';
      this.messageToShow.imgTwo = 'assets/imgs/help/rr/rr2.JPG';
      return;
    }
    else if (currentRoute.includes('/m/nob')) {
      this.messageToShow.title = 'نوبتی';
      this.messageToShow.messageOne = 'اطلاعات کلی نوبتی در این بخش قابل مشاهده است';
      this.messageToShow.imgOne = 'assets/imgs/help/fragment/nob1.JPG';
      this.messageToShow.messageTwo = 'امکان افزودن، ویرایش، مشاهده جزئیات و حذف هر مورد نیز وجود دارد.';
      this.messageToShow.messageThree = 'ستون تایید شده به معنای تایید تمامی زیر مجوعه هایی که در قسمت مسیر های هر کدام وجود دارد می باشد. درصورتی که مشکلی در ایجاد و ویرایش وجود داشته باشد سیستم بطور خودکار  پیامی برای اصلاح موارد لازم نمایش خواهد داد. ';
      this.messageToShow.imgTwo = 'assets/imgs/help/fragment/nob2.JPG';
      return;
    }
    else {
      this.messageToShow.title = 'راهنمایی';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = 'راهنمایی وجود ندارد';
      this.messageToShow.messageOne = '';
      this.messageToShow.imgTwo = '';
      return;
    }
  }
  openDialog = () => {
    this.someName(this.router.url);

    this.dialog.open(AddNewComponent, {
      data: this.messageToShow
    });
  }

}
