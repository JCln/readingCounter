import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EN_Routes } from 'interfaces/routes.enum';

import { AddNewComponent } from '../frame-work/manage/add-new/add-new.component';

export interface IHelpWrapper {
  title: string,
  messageOne: string,
  messageTwo?: string,
  messageThree?: string,
  imgOne?: string,
  imgTwo?: string,
}
@Injectable({
  providedIn: 'root'
})
export class HelpWrapperService {
  private messageToShow: IHelpWrapper = {
    title: '',
    imgOne: '',
    imgTwo: '',
    messageOne: '',
    messageTwo: '',
    messageThree: '',
  }

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  /* STATIC ROUTE S*/
  private exactRoute = (currentRoute: string): IHelpWrapper => {
    if (currentRoute === EN_Routes.wr)
      return {
        title: 'مشاهده نقشه',
        messageOne: '1-	امکان استفاده از دو لایه ظاهری2-	پرینت نقشه بصورت عمودی و افقی3-	بزرگ و کوچک کردن نقشه4-	بارگذاری مجدد نقشه درصورت خطا در نمایش احتمالی5-	مکان یابی6-	حذف تمامی لایه ها',
        imgOne: 'assets/imgs/help/wr1.PNG'
      }
    if (currentRoute === EN_Routes.wrdb)
      return {
        title: 'داشبورد',
        messageOne: 'گزارش های جامع(قرائت های انجام شده - تصاویر ارسالی- موارد غیرمجاز ثبت شده - گزارشات ثبت شده و ..)',
        messageThree: 'عملکرد فرایند قرائت، در دو نمودار رادار و میله‌ای قابل مشاهده و بررسی هستند.',
        messageTwo: 'قسمت کارکرد، مربوط به اطلاعات قرائت به تفکیک روز، هفته، ماه و سال میباشد. ',
      }
    else if (currentRoute === EN_Routes.wrmuall)
      return {
        title: 'مشاهده و ویرایش کاربران',
        messageOne: 'این بخش شامل قسمت های مشاهده همه کاربران و افزودن کاربر جدید می‌باشد.',
        imgOne: 'assets/imgs/help/edit/edit.JPG',
        messageTwo: ' بخش مشاهده کاربران، اطلاعات کلی و ویرایش کاربران در دسترس می باشد. سه آیکن سمت چپ مربوط به ویرایش اطلاعات کاربر، جزئیات ورود های قبلی و تنظیمات بیشتر کاربر می باشد. تنظیمات بیشتر برای فعال سازی، غیرفعال سازی و بازنشانی رمز عبور می باشد.',
        messageThree: 'بازنشانی بمعنای تغییر رمز عبور به شماره موبایل کابر است. قفل به معنای دسترسی یا عدم دسترسی کاربر به برنامه می باشد. در صورت اشتباه متوالی 6 بار در وارد کردن رمزعبور، کاربر به مدت 30 دقیقه قفل خواهد شد. و با هر بار اشتباه مجدد بعد از آن، زمان قفل شدن مقداری افزایش می‌یابد. به دلیل تامین امنیت هر چه بیشتر سامانه، امکان آنلاک شدن از طریق خود سامانه وجود ندارد.فعال یا غیر فعال بودن به معنای دسترسی کاربر به برنامه است و مدت مشخصی ندارد.اطلاعات هر کاربری قابل ویرایش شود.قسمت افزودن کاربر جدید برای معرفی کاربر جدید میباشد. با کامل کردن زیر قسمت های مربوطه(مشخصات کاربر-دسترسی به ناحیه-دسترسی به خدمات ارائه شده در برنامه - نوع یا گروه دسترسی) نسبت به ایجاد کاربر اقدام نمایید.',
      }
    else if (currentRoute === EN_Routes.wrmuadd)
      return {
        title: 'افزودن کاربر',
        messageOne: 'برای افزودن کاربر جدید لازم است مشخصات کاربر، دسترسی به مناطق، دسترسی به خدمات و انتخاب گروه دسترسی کامل شوند.',
        imgOne: 'assets/imgs/help/add/add.JPG',
        messageThree: 'لازم بذکر است که هر کاربر بطور کاملا پویا میتواند دسترسی های متفاوتی برحسب وظیفه و کار ایشان داشته باشد',
      }
    else if (currentRoute === EN_Routes.wrmurole)
      return {
        title: 'مدیریت گروه ها',
        messageOne: 'این بخش جهت ایجاد و بررسی نقش/گروه های موجود ایجاد شده است',
      }
    else if (currentRoute === EN_Routes.wrmueor)
      return {
        title: 'ویرایش گروهی کاربران',
        messageOne: 'جهت تغییر گروهی سطح دسترسی کاربران استفاده میشود.',
      }
    else if (currentRoute === EN_Routes.wrmssearchPro)
      return {
        title: 'جستجوی تجمیعی',
        messageOne: 'برای جستجو کامل‌تر اطلاعات، با کلیک برروی "+" نوع جستجوی خود بر اساس ناحیه را انتخاب نمایید. ',
        messageTwo: ' قسمت های اختیاری وضعیت مصرف، گزارش کنتور، وضعیت کنتور و نوبتی ها جهت جستجوی مناسب تر درنظر گرفته شده است',
      }
    else if (currentRoute === EN_Routes.wrmzsr || currentRoute === EN_Routes.wrmzsp || currentRoute === EN_Routes.wrmzszb || currentRoute === EN_Routes.wrmzsz || currentRoute === EN_Routes.wrmzsc)
      return {
        title: 'مدیریت نواحی',
        messageOne: 'این بخش برای مشاهده، شخصی سازی و کنترل نواحی درنظر گرفته شده است. هر محدوده زیرمجموعه یک ناحیه/شهر و هر ناحیه/شهر زیرمجموعه یک منطقه و هر منطقه زیرمجموعه یک استان است.',
        imgOne: 'assets/imgs/help/ARE.PNG',
        messageTwo: 'برای افزودن یک ناحیه، پس از کلیک برروی گزینه افزودن مطابق تصویر و کامل کردن مقادیر خواسته شده، ناحیه ای ایجاد میشود، نکته حائز اهمیت مقدار منطقه است که یکی از مقادیر موجود در مناطق خودگردان است.',
        messageThree: 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.',
      }
    else if (currentRoute === EN_Routes.wrmrkar || currentRoute === EN_Routes.wrmrrcd || currentRoute === EN_Routes.wrmrcs || currentRoute === EN_Routes.wrmrrpk || currentRoute === EN_Routes.wrmrrp || currentRoute === EN_Routes.wrmrqtr)
      return {
        title: 'مدیریت قرائت',
        messageOne: 'برای مشاهده، شخصی سازی و کنترل بخش های مدیریت قرائت درنظر گرفته شده است. این قسمت شامل کنترل بخش های کاربری، تنظیمات پیش فرض، وضعیت کنتور و ... است.',
        imgOne: 'assets/imgs/help/ARE.PNG',
        messageTwo: 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.',
      }
    else if (currentRoute === EN_Routes.wrmrapk)
      return {
        title: 'مدیریت apk',
        messageOne: 'این بخش به دو قسمت نسخه های گذشته و جدید تقسیم میشود. درصورتی که نیاز به استفاده از apk قبلی بود برروی دانلود فایل کلیک نمایید. برای ایجاد نسخه جدید با وارد کردن نام، کد و فایل نسخه به ایجاد نسخه جدید اقدام نمود. ',
      }
    else if (currentRoute === EN_Routes.wrimpimd)
      return {
        title: 'ایجاد مسیر',
        messageOne: 'این بخش جهت ایجاد مسیر برای مامورین قرائت درنظر گرفته شده است. به دو طریق میتوان مسیری ایجاد کرد. یک: از طریق دوره زمانی دو: بر اساس تاریخ.',
        imgOne: 'assets/imgs/help/tracking/impd1.JPG',
        messageTwo: 'تنها کافیست موارد مربوطه کامل شود تا مسیری ایجاد گردد. نکته: جهت صدور لیست لازم است دسترسی به "مشاهده دیکشنری" ها در قسمت مدیریت کاربران => مدیریت سامانه ها به کاربر داده شده باشد.',
        messageThree: 'نکته: تا زمانی که پیامی به شکل بالا نمایش داده نشده، مسیری ایجاد نشده است .نکته: امکان ویرایش مقادیر مانند درصد علی‌الحساب و درصد تصویر وجود دارد.',
        imgTwo: 'assets/imgs/help/tracking/impd3.JPG',
      }
    else if (currentRoute === EN_Routes.wrmdbf)
      return {
        title: 'دانلود خروجی',
        messageOne: 'برای دریافت فایل های متعدد(dbf) از این بخش میتوان اقدام کرد',
        imgOne: 'assets/imgs/help/dbf/dbf.JPG',
        messageTwo: 'کافی است پس از وارد کردن مقادیر، فایل بارگیری را دریافت نمایید.',
      }
    else if (currentRoute === EN_Routes.wrmfbn || currentRoute === EN_Routes.wrmfbnres)
      return {
        title: 'اطلاعات غیرمجاز',
        messageOne: 'کل اطلاعات غیرمجاز در این بخش ثبت میشود. ',
        messageTwo: 'اطلاعاتی که توسط مامورین قرائت ثبت شده قابل پیگیری می باشد.',
        messageThree: 'همچنین درصورتی که عکسی ارسال شده باشد با کلیک برروی آیکن مربوطه قابل مشاهده است.',
      }
    if (currentRoute === EN_Routes.wrmlpd)
      return {
        title: 'مامور/ها',
        messageOne: 'جزئیات بیشتر یک لیست درحال قرائت توسط مامور از جمله اطلاعات قرائت و اطلاعات مکانی قابل مشاهده است.',
        messageTwo: 'درصورت نیاز به مشاهده موقعیت مکانی مامور و اشتراک های ثبت شده برروی نقشه نیز برروی مشاهده برروی نقشه کلیک نمایید.',
      }
    else if (currentRoute === EN_Routes.wrmsfwu || currentRoute.includes(EN_Routes['wrmsfwu/']))
      return {
        title: 'پیگیری درخواست ها',
        messageOne: 'این بخش جهت پیگیری کلیه مسیر/لیست ها ایجاد شده است. ',
        messageTwo: 'جزئیات نمایشی بیشتر مانند تاریخ ثبت، نام مامور و وضعیت پیگیری قابل مشاهده هستند.',
        messageThree: 'همچنین میتوان مسیر/لیست را به قسمت قبلی بازگشت داد. برای مثال اگر مسیر در وضعیت درحال قرائت باشد میتواند به وضعیت بارگیری شده بازگشت داده شود.',
      }
    else if (currentRoute === EN_Routes.wrmtracklatest)
      return {
        title: 'آخرین وضعیت لیست/مسیر',
        messageOne: 'آخرین وضعیت لیست/مسیر ایجاد شده، در این قسمت در کنار بخش پیگیری قابل مشاهده است.',
        messageTwo: 'بطور کلی کلیه روند کارتابل از صدور لیست تا دانلود شده در این قسمت قابل پیگیری است. ',
      }
    else if (currentRoute === EN_Routes.wrmssearchMosh)
      return {
        title: 'جستجوی مشترک',
        messageOne: 'برای جستجوی مشترک میتوان به 4 طریق قابل مشاهده در تصویر اقدام نمود. ',
        imgOne: 'assets/imgs/help/search/search_mosh.JPG',
        messageTwo: 'جستجوی موارد مشابه بمعنای جستجوی تقریبی مقادیر است و نه فقط مقدار وارد شده.',
      }
    else if (currentRoute === EN_Routes.wrprofile)
      return {
        title: 'تنظیمات کاربری',
        messageOne: 'مشخصات کاربری شما در این قسمت قابل مشاهده است، درصورت نیاز به تغییر گذرواژه با وارد کردن گذرواژه فعلی و گذرواژه مدنظر نسبت به تغییر آن اقدام نمایید.',
        messageTwo: 'توجه شود که اگر گذرواژه شما قبلا بازنشانی شده باشد، گذرواژه، شماره موبایل شما خواهد بود. ',
        messageThree: 'سایر تنظیمات جهت ذخیره تغییرات کاربران در مراجعات بعدی به برنامه درنظر گرفته شده است',
      }
    else if (currentRoute === EN_Routes.wrmtrackreading)
      return {
        title: 'درحال قرائت',
        messageOne: 'این قسمت جهت پگیری آنی و درلحظه اشتراک های ثبت شده می‌باشد. چهار گزینه همانند تصویر وجود دارد',
        imgOne: 'assets/imgs/help/tracking/reading3.JPG',
        messageTwo: 'اتمام قرائت: درصورتی که به هر علتی مامور قرائت قادر به اتمام فرایند قرائت نبود، از این گزینه استفاده میشود. بارگشت به صادر شده:  بازگشت مسیر به بخش صادر شده. مشاهده مامور/ها:  امکان مشاهده اطلاعات کلی مامور درحال قرائت و همچنین آخرین مکان(اشتراک) ثبت شده و مسیر طی شده برروی نقشه. ',
        messageThree: 'مشاهده لیست قرائت: لیست کلیه مشترکین در مسیر، همراه با جزئیات بیشتر و همچنین مشاهده تصاویر یا صوت بارگذاری شده در لحظه. لیست کلیه مسیر های در حال قرائت تا قبل از تخلیه اطلاعات توسط مامور در این قسمت قابل مشاهده است. ',
      }
    else if (currentRoute === EN_Routes.wrmtrackimported)
      return {
        title: 'لیست صادر شده',
        messageOne: 'مشاهده جزئیات: علاوه بر مشاهده جزئیات بیشتر لیست صادر شده، میتوان لیست را ویرایش کرد، برای مثال تغییر مامور قرائت.',
        messageTwo: 'لیست مسیر ها قبل از بارگیری توسط مامور در این قسمت قابل مشاهده است.',
        messageThree: 'حذف مسیر با ارائه توضیح قابل انجام است.',
      }
    else if (currentRoute === EN_Routes.wrmtrackloaded)
      return {
        title: 'لیست بارگیری شده توسط مامور',
        messageOne: 'با بارگیری مسیر توسط مامور قرائت، مسیر به این قسمت منتقل میشود. لیست مسیر های بارگذاری شده توسط تمامی مامور ها قبل از شروع قرائت در این قسمت هستند.',
        messageTwo: 'برگشت به صادر شده:  با ارائه دلیل، قابل انجام است',
        messageThree: 'حذف مسیر:  با ارائه دلیل قابل انجام است.',
      }
    else if (currentRoute === EN_Routes.wrflashlr)
      return {
        title: 'آخرین قرائت ماموران',
        messageOne: 'با هر قرائت توسط مامور یک نقطه روی نقشه زده خواهد شد و در جدول جزئیات آنرا خواهید دید.',
      }
    else if (currentRoute === EN_Routes.realtimeMessage)
      return {
        title: 'پیام به کاربران آنلاین',
        messageOne: 'میتوان با تنظیمات زیر پیامی به کاربران ارسال کرد. متن پیشفرضی درنظر گرفته شده که با کلیک روی دکمه استفاده قابل ویرایش نیز می باشد.',
      }
    else if (currentRoute === EN_Routes.wrpolicies)
      return {
        title: 'تنظیمات امنیتی',
        messageOne: 'موارد امنیتی مانند حداقل تعداد گذرواژه را تنظیم نمایید.',
      }
    else if (currentRoute === EN_Routes.userKarkardSummary)
      return {
        title: 'کاربر خلاصه عملکرد',
        messageOne: 'امکان نمایش عملکرد کاربر براساس تعداد مطابق با عملیات کارتابل وجود دارد. مثلا ماموری در بازه زمانی دو روز دوبار بارگیری و دوبار بارگذاری کرده است.',
      }
    else if (currentRoute === EN_Routes.userOnlines)
      return {
        title: 'کاربران آنلاین',
        messageOne: 'مشاهده کاربرانی که درحال حاضر به سامانه متصل هستند.',
        messageTwo: 'زمان به معنای آخرین ورود کاربران تاکنون است.',
      }
    else if (currentRoute === EN_Routes.wrSettingsWaterMark)
      return {
        title: 'واتر مارک',
        messageOne: 'جزئیات واترمارک بر روی تصویر(عکس گرفته شده) قابل ویرایش است',
        messageTwo: 'توجه نمایید که فاصله از چپ و بالا بطور تقریبی نمایش داده میشود',
      }
  }
  /* DYNAMIC ROUTES */
  private similarIncludeRoute = (currentRoute: string): IHelpWrapper => {
    if (currentRoute.includes(EN_Routes['wr;trackNumber=']))
      return {
        title: 'پیگیری درحال قرائت',
        messageOne: 'اشتراک های درحال قرائت با نقطه مشخص شده اند. با کلیک بروی هرکدام اطلاعات اشتراک مشخص میشود.',
        messageTwo: ' درصورت نیاز به مشاهده مسیر طی شده(اشتراک های ثبت شده) برروی زمان نمایش کلیک نمایید. زمان مشاهده براساس میلی ثانیه "ms" است.',
      }
    else if (currentRoute.includes(EN_Routes.wrmrformula))
      return {
        title: 'تعرفه ها',
        messageOne: 'امکان ایجاد و تغییر تعرفه در ناحیه ها ایجاد شده است. هر قسمت امکان افزودن تکی و افزودن دسته ای با استفاده از فایل Excel را دارد.',
        messageTwo: 'امکان دانلود راهنمای نمونه فایل قابل ارسال و همچنین ویرایش و حذف هر مورد وجود دارد.',
      }
    else if (currentRoute.includes(EN_Routes.wrmal))
      return {
        title: 'درخت دسترسی',
        messageOne: 'باتوجه به اینکه برنامه بصورت یکپارچه و با هدف پوشش استان های کشور، به صورت لایه ای درنظر گرفته شده است. قسمت درخت دسترسی از بخش های Appها، ماژول ها، کنترلر ها و اکشن ها بصورت طبقه ای تشکلیل شده است. برای مثال بخش App ها شامل برنامه های کلی درحال استفاده می باشد مانند سامانه جامع قرائت کنتور. ماژول ها از سامانه قرائت کنتور و کنترلر ها از ماژول تشکیل شده اند. مثلا کنترلر های کاربری ها و وضعیت کنتور از ماژول مدیریت قرائت تشکیل شده است و مدیریت قرائت خود یک App است.',
        imgOne: 'assets/imgs/help/ARE.PNG',
        messageTwo: 'امکان جستجو، ویرایش، حذف و افزودن مطابق تصویر می‌باشد.',
      }
    else if (currentRoute.includes(EN_Routes.wrmuedit))
      return {
        title: 'ویرایش کاربر',
        messageOne: 'این قسمت به ویرایش اطلاعات شخصی کاربر مانند نام کاربری یا کد کاربری، نواحی قابل دسترس کاربر، سطح دسترسی ها و نقش کاربر تقسیم میشود. دسترسی به خدمات کاربر در این قسمت مشخص میشود. زیر بخش نواحی برای دسترسی به ناحیه مدنظر کاربر درنظر گرفته شده است.',
        imgOne: 'assets/imgs/help/edit/edit1.JPG',
        messageTwo: 'زیر بخش سطح دسترسی به خدمات شامل اپلیکیشن قرائت ، مدیریت سامانه و سامانه قرائت کنتور است که محدود کننده سطح دسترسی به کاربر است',
        imgTwo: 'assets/imgs/help/edit/edit2.JPG',
      }
    else if (currentRoute.includes(EN_Routes.wrmtrackoffloadedoffloadMfy))
      return {
        title: 'اصلاح',
        messageOne: 'برای اصلاح، میتوان باتوجه به عکس(ها) و یا صوت ارسال شده نسبت به ویرایش اقدام کرد.',
        imgOne: 'assets/imgs/help/offloadmodify/modify.JPG',
        messageTwo: 'درصورت کلیک برروی هر عکس میتوان بزرگ شده هرکدام از تصاویر را مشاهده نمود.',
      }
    else if (currentRoute === EN_Routes.wrmtrackoffloaded)
      return {
        title: 'بارگذاری شده',
        messageOne: 'زمانی که مامور پس از پایان قرائت انجام شده، اقدام به بارگذاری(تخلیه) مینماید، لیست قرائت به این قسمت منتقل میشود. درصورت نیاز به اصلاح یا بررسی لیست، برروی آیکن مشاهده(اصلاح) لیست کلیک نمایید ',
        messageTwo: 'دانلود فایل: با کلیک برروی دانلود فایل و ذخیره، فایل شما به قسمت دانلود مرورگر منتقل خواهد شد.',
        messageThree: 'پس از آن این مسیر به قسمت دانلود شده منتقل و تا مدت محدود قابل مشاهده است ',
      }
    else if (currentRoute.includes(EN_Routes.wrmlalltrue))
      return {
        title: 'لیست بارگذاری شده',
        messageOne: 'کلیه اطلاعات قرائت شده (تخلیه شده) توسط مامور قرائت در این قسمت قابل مشاهده و اصلاح می باشد. برای اصلاح بروی آیکن اصلاح کلیک تا به صفحه اصلاح منتقل شوید',
        imgOne: 'assets/imgs/help/offloadmodify/allmodify.JPG',
      }
    else if (currentRoute.includes(EN_Routes.wrmlallfalse))
      return {
        title: 'لیست قرائت',
        messageOne: ' لیست قرائت مامور در این قسمت قابل مشاهده می باشد. درصورتی که عکس(ها) و یا صوتی گرفته شده باشد با کلیک برروی "بررسی عکس/صوت" قابل بررسی می باشد.',
        imgOne: 'assets/imgs/help/woui/woui.JPG',
      }
    else if (currentRoute.includes(EN_Routes.wrmsacme))
      return {
        title: 'جستجوی تجمیعی',
        messageOne: 'لیست قرائت جستجو شده در این قسمت قابل مشاهده می باشد. درصورتی که عکس(ها) و یا صوتی گرفته شده باشد با کلیک برروی "بررسی عکس/صوت" قابل بررسی می باشد.',
      }
    else if (currentRoute === EN_Routes.rptskarkardDaily)
      return {
        title: 'گزارش لیست مامور',
        messageOne: 'اشتراک های قرائت شده را با جزئیات نمایش میدهد. تیک نمایش همه برای نمایش لیست پس از قرائت است و توسط مامور بارگذاری انجام شده است.',
      }
    else if (currentRoute === EN_Routes.wrofflinetxtout)
      return {
        title: 'بارگذاری اطلاعات مامور',
        messageOne: 'کلیه اطلاعاتی که توسط مامور ثبت شده و در فرآیند ارسال با مشکل مواجه شده ارسال نمایید(لیست میتواند تصویر، صوت، غیرمجاز یا هر داده دیگری نیز باشد)',
      }
    else if (currentRoute === EN_Routes.offlineLoad)
      return {
        title: 'بارگیری اطلاعات مامور',
        messageOne: 'ماموری که در دریافت لیست صادر شده با مشکل مواجه شده باشد، فایلی که در این قسمت دریافت میکند را به گوشی خود منتقل و فرایند قرائت را انجام میدهد',
      }
    else if (currentRoute === EN_Routes.wrrptsmamKarkardAllStates)
      return {
        title: 'همه وضعیت های قرائت شده',
        messageOne: 'گزارشی از کلیه وضعیت های قابل ثبت توسط مامور را ارائه میکند. انتخاب نوبتی اختیاری است.',
      }
    else if (currentRoute === EN_Routes.serverOSInfo)
      return {
        title: 'اطلاعات سرور در حال استفاده',
        messageOne: 'زمان فعالیت: از آخرین زمانی که خاموش یا ریست شده است تا کنون محاسبه میشود',
        messageTwo: 'زمان: زمان فعلی سرور است'
      }
    else if (currentRoute === EN_Routes.downloadAI)
      return {
        title: 'دانلود روزانه',
        messageOne: 'دانلود کل تصاویر گرفته شده در یک روز',
      }
    else if (currentRoute === EN_Routes.uploadSingle)
      return {
        title: 'آپلود تکی',
        messageOne: 'برای اضافه کردن تصویر به شماره اشتراک قابل استفاده است'
      }
    else if (currentRoute.includes(EN_Routes.wrrptsexmdetails)
      || currentRoute.includes(EN_Routes.wrrptsmamtrv)
      || currentRoute.includes(EN_Routes.wrrptsmamtrvch)
      || currentRoute.includes(EN_Routes.wrrptsmamkarkard)
      || currentRoute.includes(EN_Routes.wrrptsmamdh)
      || currentRoute.includes(EN_Routes.wrrptsexmmaster)
      || currentRoute.includes(EN_Routes.wrrptsexmdetails)
      || currentRoute.includes(EN_Routes.wrmdmacranlz)
      || currentRoute.includes(EN_Routes.wrrptsmamoffkarkard))
      return {
        title: 'گزارشات',
        messageOne: 'این بخش جهت گزارش گیری از بخش هایی مانند کارکرد روزانه، پیمایشات و .. می باشد. ',
        imgOne: 'assets/imgs/help/rr/rr1.JPG',
        messageTwo: 'در هر قسمت با وارد کردن مقادیر خواسته شده براساس تاریخ و یا دوره میتوان گزارش ها و گاهی نمودار مناسب آن بخش را مشاهده کرد',
        messageThree: 'در صورت اشتباه در وارد کردن مقادیر، سیستم بطور خودکار پیامی برای اصلاح موارد لازم نمایش خواهد داد.',
        imgTwo: 'assets/imgs/help/rr/rr2.JPG',
      }
    else if (currentRoute.includes(EN_Routes.wrrptsmamgis))
      return {
        title: 'گزارش مکانمند',
        messageOne: 'این قسمت برای مشاهده گزارش مکانمند بر اساس وضعیت کنتور، غیرمجاز و .. می‌باشد. یعنی امکان مشاهده وضعیت، در ناحیه مدنظر برروی نقشه . ',
        imgOne: 'assets/imgs/help/rr/gis.JPG',
        messageTwo: 'با فعال سازی خوشه بندی امکان مشاهده درخواست به شکل کلی تر و بر اساس تراکم آن درخواست برروی نقشه قابل مشاهده است.',
      }
    else if (currentRoute.includes(EN_Routes.wrrptsanlzprfm))
      return {
        title: 'گزارش آنالیز کارکرد',
        messageOne: 'این قسمت جهت مشاهده آمار کلیه قرائت های ثبت شده توسط ماموران از نظر بیشینه، کمینه، میانه و ... در وضعیت قرائت مشخص می باشد. ',
        messageTwo: 'این قسمت بعلت آمار کلی قرائت های ثبت شده برای متخصصان آمار نیز پرکاربر می‌باشد. ',
      }
    else if (currentRoute.includes(EN_Routes.wrmrnob))
      return {
        title: 'نوبتی',
        messageOne: 'اطلاعات کلی نوبتی در این بخش قابل مشاهده است',
        imgOne: 'assets/imgs/help/fragment/nob2.JPG',
        messageTwo: 'با ورود به بخش مدیریت مسیر ها، امکان ایجاد مسیر/ها برای بازه‌/ها اشتراکی وجود دارد.',
        messageThree: 'امکان افزودن، ویرایش، مشاهده جزئیات و حذف هر مورد نیز وجود دارد. ستون تایید شده به معنای تایید تمامی زیر مجوعه ها در یک مسیر است. درصورتی که مشکلی در ایجاد و ویرایش وجود داشته باشد سیستم بطور خودکار  پیامی برای اصلاح موارد لازم نمایش خواهد داد. ',
      }
    else if (currentRoute.includes(EN_Routes.wrmtrack))
      return {
        title: 'مدیریت پیگیری ها',
        messageOne: 'این بخش جهت رهگیری وضعیت قرائت می باشد.',
        imgOne: 'assets/imgs/help/tracking/reading2.JPG',
        messageTwo: 'از زمانی که مسیری(لیست) ایجاد میشود، مسیر در قسمت صادر شده قرار میگیرد. به محض آنکه از طریق اپلیکیشن قرائت بارگیری انجام گیرد، مسیر به قسمت دریافت شده منتقل میشود. پس از آن با ثبت اولین اشتراک توسط مامور به قسمت در حال قرائت منتقل و قابل پیگیری همزمان خواهد شد. و پس از پایان قرائت و بارگذاری عملیات، لیست/مسیر به قسمت بارگذاری شده و درصورت بارگیری به دانلود شده منتقل خواهد شد',
        messageThree: 'در هر قسمت امکان مشاهده و ویرایش مراحل درنظر گرفته شده است. همچنین مشاهده و بررسی تصویر/ها و صوت ارسال شده توسط مامور نیز وجود دارد',
        imgTwo: 'assets/imgs/help/tracking/reading1.JPG',
      }
    else if (currentRoute.includes(EN_Routes.wrimpsimafardpg))
      return {
        title: 'سیمافا صدور لیست',
        messageOne: 'این بخش جهت ایجاد مسیر برای مامورین قرائت درنظر گرفته شده است. به دو طریق تکی و دسته ای میتوان لیست/مسیر ایجاد کرد.',
        messageTwo: 'برای مسیر تکی کافی است پس از انتخاب موارد(مانند ناحیه) و بارگیری لیست مربوطه، در هر سطر، با کلیک برروی "تکی" نسبت به ایجاد یک مسیر و برای لیست دسته ای برروی "دسته‌ای" کلیک کرده تا به صفحه مربوطه منتقل شوید.',
        messageThree: 'درصورتی که لیست قبلا صادر شده باشد، امکان ایجاد مجدد آن وجود ندارد.',
      }
    else if (currentRoute.includes(EN_Routes.wrimpsimafardpgbatch))
      return {
        title: 'سیمافا افزودن لیست دسته‌ای',
        messageOne: 'پس از انتخاب تمامی مامور های قرائت در هر سطر(مسیر) برروی ایجاد لیست کلیک کرده تا لیست مربوطه ایجاد شود',
      }
    else if (currentRoute.includes(EN_Routes.wrmuallloggins))
      return {
        title: 'ورود های کاربران',
        messageOne: 'اطلاعات ورود کابران با جزئیات بیشتر قابل مشاهده است ',
        messageTwo: 'از جمله دفعات ورود،  سیستم عامل و نسخه آن، زمان های وارد شده و ..',
      }
    else
      return {
        title: 'راهنمایی',
        messageOne: 'راهنمایی وجود ندارد',
      }
  }
  openDialog = () => {
    let currentVal: IHelpWrapper = this.exactRoute(this.router.url);
    if (!currentVal)
      currentVal = this.similarIncludeRoute(this.router.url);

    this.messageToShow.title = currentVal.title;
    this.messageToShow.imgOne = currentVal.imgOne;
    this.messageToShow.imgTwo = currentVal.imgTwo;
    this.messageToShow.messageOne = currentVal.messageOne;
    this.messageToShow.messageTwo = currentVal.messageTwo;
    this.messageToShow.messageThree = currentVal.messageThree;

    this.dialog.open(AddNewComponent, {
      minWidth: '65vw',
      data: currentVal
    });
  }

}







































