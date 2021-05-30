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
    if (currentRoute === '/wr') {
      this.messageToShow.title = 'مشاهده نقشه';
      this.messageToShow.messageOne = '1-	امکان استفاده از دو لایه ظاهری2-	پرینت نقشه بصورت عمودی و افقی3-	بزرگ و کوچک کردن نقشه4-	بارگذاری مجدد نقشه درصورت خطا در نمایش احتمالی5-	مکان یابی6-	حذف تمامی لایه ها';
      this.messageToShow.imgOne = 'assets/imgs/help/wr1.PNG';
      this.messageToShow.messageThree = '';
      this.messageToShow.messageTwo = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    if (currentRoute === '/wr/db') {
      this.messageToShow.title = 'داشبورد';
      this.messageToShow.messageOne = 'گزارش های جامع(قرائت های انجام شده - تصاویر ارسالی- موارد غیرمجاز ثبت شده - گزارشات ثبت شده و ..)';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageThree = 'عملکرد فرایند قرائت را در دو نمودار رادار و میلیه ای قابل مشاهده و بررسی هستند.';
      this.messageToShow.messageTwo = 'قسمت کارکرد، مربوط به اطلاعات قرائت به تفکیک روز، هفته، ماه و سال میباشد. ';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/mu/edit' || currentRoute === '/wr/mu/all') {
      this.messageToShow.title = 'مشاهده و ویرایش کاربران';
      this.messageToShow.messageOne = 'این بخش شامل قسمت های مشاهده همه کاربران و افزودن کاربر جدید می‌باشد.';
      this.messageToShow.imgOne = 'assets/imgs/help/edit/edit.JPG';
      this.messageToShow.messageTwo = ' بخش مشاهده کاربران، اطلاعات کلی و ویرایش کاربران در دسترس می باشد. سه آیکن سمت چپ مربوط به ویرایش اطلاعات کاربر، جزئیات ورود های قبلی و تنظیمات بیشتر کاربر می باشد. تنظیمات بیشتر برای فعال سازی، غیرفعال سازی و بازنشانی رمز عبور می باشد.';
      this.messageToShow.messageThree = 'بازنشانی بمعنای تغییر رمز عبور به شماره موبایل کابر است.قفل به معنای دسترسی یا عدم دسترسی کاربر به برنامه می باشد. درصورتی که کاربری به دفعات متعدد به اشتباه نام کاربری و گذرواژه را وارد کند در مدت زمان مشخصی قفل میشود و قادر به ورود نخواهد بود. مدت زمان آن نیز در قسمت سطح دسترسی قابل تنظیم می باشد.فعال یا غیر فعال بودن به معنای دسترسی کاربر به برنامه است و مدت مشخصی ندارد.اطلاعات هر کاربری قابل ویرایش شود.قسمت افزودن کاربر جدید برای معرفی کاربر جدید میباشد. با کامل کردن زیر قسمت های مربوطه(مشخصات کاربر-دسترسی به ناحیه-دسترسی به خدمات ارائه شده در برنامه - نوع یا گروه دسترسی) نسبت به ایجاد کاربر اقدام نمایید.';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/mu/all/loggins/') {
      this.messageToShow.title = 'ورود های کاربران';
      this.messageToShow.messageOne = 'اطلاعات ورود کابران با جزئیات بیشتر قابل مشاهده است ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'از جمله دفعات ورود،  سیستم عامل و نسخه آن، زمان های وارد شده و ..';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/mu/add') {
      this.messageToShow.title = 'افزودن کاربر';
      this.messageToShow.messageOne = 'برای افزودن کاربر جدید لازم است مشخصات کاربر، دسترسی به مناطق، دسترسی به خدمات و انتخاب گروه دسترسی کامل شوند.';
      this.messageToShow.imgOne = 'assets/imgs/help/add/add.JPG';
      this.messageToShow.messageThree = 'لازم بذکر است که هر کاربر بطور کاملا پویا میتواند دسترسی های متفاوتی برحسب وظیفه و کار ایشان داشته باشد';
      this.messageToShow.messageTwo = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/zs/r' || currentRoute === '/wr/m/zs/p' || currentRoute === '/wr/m/zs/zb' || currentRoute === '/wr/m/zs/z' || currentRoute === '/wr/m/zs/c') {
      this.messageToShow.title = 'مدیریت نواحی';
      this.messageToShow.messageOne = 'این بخش برای مشاهده، شخصی سازی ، کنترل نواحی درنظر گرفته شده است.از قسمت های کشور، استان، مناطق، نواحی و محدوده ها تشکیل شده است بطوری که هر محدوده مربوط به یک ناحیه/شهر است. همچنین هر ناحیه/شهر مربوط به یک منطقه است. برای مثال مجموعه استان ها کشور را میسازند.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'این بخش به این منظور درنظر گرفته شده است که بتوان بسادگی نواحی مختلف را درنظر گرفت. مثلا محدوده جدیدی را به یک ناحیه افزود';
      this.messageToShow.messageThree = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/r/kar' || currentRoute === '/wr/m/r/rcd' || currentRoute === '/wr/m/r/cs' || currentRoute === '/wr/m/r/rpk' || currentRoute === '/wr/m/r/rp' || currentRoute === '/wr/m/r/qtr') {
      this.messageToShow.title = 'مدیریت قرائت';
      this.messageToShow.messageOne = 'برای مشاهده، شخصی سازی و کنترل بخش های مدیریت قرائت درنظر گرفته شده است. این قسمت شامل کنترل بخش های کاربری، تنظیمات پیش فرض، وضعیت کنتور و ... است.';
      this.messageToShow.imgOne = 'assets/imgs/help/ARE.PNG';
      this.messageToShow.messageTwo = 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/r/apk') {
      this.messageToShow.title = 'مدیریت apk';
      this.messageToShow.messageOne = 'این بخش به دو قسمت نسخه های گذشته و جدید تقسیم میشود. درصورتی که نیاز به استفاده از apk قبلی بود میتوان برروی فایل مربوط به همان سطر کلیک تا به عنوان نسخه جدید درنظر گرفته شود. برای ایجاد نسخه جدید با وارد کردن نام، شماره و فایل نسخه میتوان به ایجاد نسخه جدید اقدام نمود. ';
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
      this.messageToShow.messageTwo = 'نکته: جهت صدور لیست لازم است دسترسی به "مشاهده دیکشنری" ها در قسمت مدیریت کاربران => مدیریت سامانه ها به کاربر داده شده باشد.';
      this.messageToShow.messageThree = 'نکته: تا زمانی که پیامی به شکل زیر نمایش داده نشده، مسیری ایجاد نشده است .نکته: امکان ویرایش مقادیر مانند درصد علی الحساب و درصد تصویر وجود دارد.';
      this.messageToShow.imgTwo = 'assets/imgs/help/tracking/impd3.JPG';
      return;
    }
    else if (currentRoute === '/wr/m/dbf') {
      this.messageToShow.title = 'دانلود خروجی';
      this.messageToShow.messageOne = 'برای دریافت فایل های متعدد(dbf) از این بخش میتوان اقدام کرد';
      this.messageToShow.imgOne = 'assets/imgs/help/dbf/dbf.JPG';
      this.messageToShow.messageTwo = 'کافی است پس از وارد کردن مقادیر، فایل بارگیری را دریافت نمایید.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/fbn' || currentRoute === '/wr/m/fbn/res') {
      this.messageToShow.title = 'اطلاعات غیرمجاز';
      this.messageToShow.messageOne = 'کل اطلاعات غیرمجاز در این بخش ثبت میشود. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'اطلاعاتی که توسط مامورین قرائت ثبت شده قابل پیگیری می باشد.';
      this.messageToShow.messageThree = 'همچنین درصورتی که عکسی ارسال شده باشد با کلیک برروی آیکن مربوطه قابل مشاهده است.';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/s/fwu' || currentRoute.includes('/wr/m/s/fwu/')) {
      this.messageToShow.title = 'پیگیری درخواست ها';
      this.messageToShow.messageOne = 'این بخش جهت پیگیری کلیه مسیر/لیست های ایجاد شده ایجاد شده است. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'جزئیات نمایشی بیشتر مانند تاریخ ثبت، نام مامور و وضعیت پیگیری قابل مشاهده هستند.';
      this.messageToShow.messageThree = 'همچنین میتوان مسیر/لیست را به قسمت قبلی بازگشت داد. برای مثال اگر مسیر در وضعیت درحال قرائت باشد میتواند به وضعیت بارگیری شده بازگشت داده شود.';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/track/latest') {
      this.messageToShow.title = 'آخرین وضعیت لیست/مسیر';
      this.messageToShow.messageOne = 'آخرین وضعیت لیست/مسیر ایجاد شده، در این قسمت در کنار بخش پیگیری قابل مشاهده است.';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'بطور کلی کلیه روند کارتابل از صدور لیست تا دانلود شده در این قسمت قرار میگیرد. ';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/m/s/searchMosh') {
      this.messageToShow.title = 'جستجوی مشترک';
      this.messageToShow.messageOne = 'برای جستجوی مشترک میتوان به 4 طریق قابل مشاهده در تصویر اقدام نمود. ';
      this.messageToShow.imgOne = 'assets/imgs/help/search/search_mosh.JPG';
      this.messageToShow.messageTwo = 'جستجوی موارد مشابه بمعنای جستجوی تقریبی مقادیر است و نه فقط مقدار وارد شده.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute === '/wr/profile') {
      this.messageToShow.title = 'تنظیمات کاربری';
      this.messageToShow.messageOne = 'مشخصات کاربری شما در این قسمت قابل مشاهده است، درصورت نیاز به تغییر گذرواژه با وارد کردن گذرواژه فعلی و گذرواژه مدنظر نسبت به تغییر آن اقدام نمایید.';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'توجه شود که اگر گذرواژه شما قبلا بازنشانی شده باشد، گذرواژه،شماره موبایل شما خواهد بود. ';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }

    /* DYNAMIC OR INCLUDES ROUTE S */


    else if (currentRoute.includes('/wr/m/l/pd/')) {
      this.messageToShow.title = 'مامور/ها';
      this.messageToShow.messageOne = 'جزئیات بیشتر یک لیست درحال قرائت توسط مامور از جمله اطلاعات قرائت و اطلاعات مکانی قابل مشاهده است.';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'درصورت نیاز به مشاهده موقعیت مکانی مامور و اشتراک های ثبت شده برروی نقشه نیز برروی مشاهده برروی نقشه کلیک نمایید.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/wr/m/r/formula/')) {
      this.messageToShow.title = 'تعرفه ها';
      this.messageToShow.messageOne = 'این بخش مربوط به تبصره 2، 3، بودجه و آبها می‌باشد. هر قسمت امکان افزودن دسته ای با استفاده از فایل Excel  و افزودن تکی را دارد. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'امکان دانلود راهنمای نمونه فایل قابل ارسال و هنچنین ویرایش و حذف هر مورد وجود دارد.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/wr/m/al/')) {
      this.messageToShow.title = 'درخت دسترسی';
      this.messageToShow.messageOne = 'باتوجه به اینکه برنامه بصورت یکپارچه و با هدف پوشش استان های کشور، به صورت لایه ای درنظر گرفته شده است. قسمت درخت دسترسی از بخش های Appها، ماژول ها، کنترلر ها و اکشن ها بصورت طبقه ای تشکلیل شده است. برای مثال بخش App ها شامل برنامه های کلی درحال استفاده می باشد مانند سامانه جامع قرائت کنتور. ماژول ها از سامانه قرائت کنتور و کنترلر ها از ماژول تشکیل شده اند. مثلا کنترلر های کاربری ها و وضعیت کنتور از ماژول مدیریت قرائت تشکیل شده است و مدیریت قرائت خود یک App است.';
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
      this.messageToShow.messageOne = 'زمانی که مامور پس از پایان قرائت انجام شده، اقدام به بارگذاری(تخلیه) مینماید، لیست قرائت به این قسمت منتقل میشود. درصورت نیاز به اصلاح یا بررسی لیست، برروی آیکن مشاهده(اصلاح) لیست کلیک نمایید ';
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
    else if (currentRoute.includes('/m/l/all/false/') || currentRoute.includes('/m/track/woui/false')) {
      this.messageToShow.title = 'لیست قرائت';
      this.messageToShow.messageOne = ' لیست قرائت مامور در این قسمت قابل مشاهده می باشد. درصورتی که عکس(ها) و یا صوتی گرفته شده باشد با کلیک برروی "بررسی عکس/صوت" قابل بررسی می باشد.';
      this.messageToShow.imgOne = 'assets/imgs/help/woui/woui.JPG';
      this.messageToShow.messageTwo = '';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('exm/details') || currentRoute.includes('mam/trv') || currentRoute.includes('mam/trvch') || currentRoute.includes('mam/karkard') || currentRoute.includes('mam/karkardDaily') || currentRoute.includes('mam/dh') || currentRoute.includes('exm/master') || currentRoute.includes('exm/details')) {
      this.messageToShow.title = 'گزارشات';
      this.messageToShow.messageOne = 'این بخش جهت گزارش گیری از بخش هایی مانند کارکرد روزانه، پیمایشات و .. می باشد. ';
      this.messageToShow.imgOne = 'assets/imgs/help/rr/rr1.JPG';
      this.messageToShow.messageTwo = 'در هر قسمت با وارد کردن مقادیر خواسته شده براساس تاریخ و یا دوره میتوان گزارش ها و گاهی نمودار مناسب آن بخش را مشاهده کرد';
      this.messageToShow.messageThree = 'در صورت اشتباه در وارد کردن مقادیر، سیستم بطور خودکار پیامی برای اصلاح موارد لازم نمایش خواهد داد.';
      this.messageToShow.imgTwo = 'assets/imgs/help/rr/rr2.JPG';
      return;
    }
    else if (currentRoute.includes('mam/gis')) {
      this.messageToShow.title = 'گزارش مکانمند';
      this.messageToShow.messageOne = 'این قسمت برای مشاهده گزارش مکانمند بر اساس وضعیت کنتور، غیرمجاز و .. می‌باشد. یعنی امکان مشاهده وضعیت، در ناحیه مدنظر برروی نقشه . ';
      this.messageToShow.imgOne = 'assets/imgs/help/rr/gis.JPG';
      this.messageToShow.messageTwo = 'با فعال سازی خوشه بندی امکان مشاهده درخواست به شکل کلی تر و بر اساس تراکم آن درخواست برروی نقشه قابل مشاهده است.';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('anlz/prfm')) {
      this.messageToShow.title = 'گزارش آنالیز کارکرد';
      this.messageToShow.messageOne = 'این قسمت جهت مشاهده آمار کلیه قرائت های ثبت شده توسط ماموران از نظر بیشینه، کمینه، میانه و ... در وضعیت قرائت مشخص می باشد. ';
      this.messageToShow.imgOne = '';
      this.messageToShow.messageTwo = 'این قسمت بعلت آمار کلی قرائت های ثبت شده برای متخصصان آمار نیز پرکاربر می‌باشد. ';
      this.messageToShow.messageThree = '';
      this.messageToShow.imgTwo = '';
      return;
    }
    else if (currentRoute.includes('/m/r/nob')) {
      this.messageToShow.title = 'نوبتی';
      this.messageToShow.messageOne = 'اطلاعات کلی نوبتی در این بخش قابل مشاهده است';
      this.messageToShow.imgOne = 'assets/imgs/help/fragment/nob1.JPG';
      this.messageToShow.messageTwo = 'امکان افزودن، ویرایش، مشاهده جزئیات و حذف هر مورد نیز وجود دارد.';
      this.messageToShow.messageThree = 'ستون تایید شده به معنای تایید تمامی زیر مجوعه هایی که در قسمت مسیر های هر کدام وجود دارد می باشد. درصورتی که مشکلی در ایجاد و ویرایش وجود داشته باشد سیستم بطور خودکار  پیامی برای اصلاح موارد لازم نمایش خواهد داد. ';
      this.messageToShow.imgTwo = 'assets/imgs/help/fragment/nob2.JPG';
      return;
    }
    else if (currentRoute.includes('/wr/m/track')) {
      this.messageToShow.title = 'مدیریت پیگیری ها';
      this.messageToShow.messageOne = 'این بخش جهت رهگیری وضعیت قرائت می باشد.';
      this.messageToShow.imgOne = 'assets/imgs/help/tracking/reading1.JPG';
      this.messageToShow.messageTwo = 'از زمانی که مسیری ایجاد میشود، مسیر ایجاد شده در قسمت صادر شده قرار میگیرد. به محض آنکه از طریق اپلیکیشن قرائت بارگیری انجام گیرد، مسیر به قسمت دریافت شده منتقل میشود. پس از آن با ثبت اولین اشتراک توسط مامور به قسمت در حال قرائت منتقل و قابل پیگیری همزمان خواهد شد. و پس از پایان قرائت و بارگذاری عملیات، لیست/مسیر به قسمت بارگذاری شده و درصورت بارگیری به دانلود شده منتقل خواهد شد';
      this.messageToShow.messageThree = 'در هر قسمت امکان مشاهده و ویرایش مراحل درنظر گرفته شده است. برای مثال در قسمت در حال قرائت امکان مشاهده لیست درحال قرائت مامور با امکان مشاهده برروی نقشه در نظر گرفته شده است. همچنین مشاهده و بررسی تصویر/ها و صوت ارسال شده توسط مامور نیز وجود دارد';
      this.messageToShow.imgTwo = 'assets/imgs/help/tracking/reading2.JPG';
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
