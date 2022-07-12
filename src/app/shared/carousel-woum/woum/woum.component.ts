import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Galleria } from 'primeng/galleria';
import { DownloadManagerService } from 'services/download-manager.service';
import { ProfileService } from 'services/profile.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { OffloadModify } from 'src/app/classes/offload-modify-type';
import { IOnOffLoad, IOverAllWOUIInfo } from 'src/app/Interfaces/itrackings';

import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@Component({
  selector: 'app-woum',
  templateUrl: './woum.component.html',
  styleUrls: ['./woum.component.scss']
})
export class WoumComponent implements OnChanges {

  @Input() zoneId: string = null;
  @Input() preDate: string;
  @Input() description: string;
  @Input() preNumber: number;
  @Input() id: string;
  @Input() counterStateCode: string;
  @Input() counterNumber: string;
  @Input() eshterak: string;
  @Input() counterStateId: string;
  @Input() firstName: string;
  @Input() sureName: string;
  @Input() radif: number;

  testGallery = [
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExIVFhUXFhoXGRgWFxgXHRkWFRcXFxgZGBYYHiggGhslGxUVIjEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGy0mHyUtLS0tMi8tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBQcGAf/EAD0QAAEDAgMEBwYFAwQDAQAAAAEAAhEDBBIhMQVBUWEGInGBkaHRBxMyscHwQlJicuEUI6KCktLxFjPCFf/EABsBAQACAwEBAAAAAAAAAAAAAAAEBQEDBgIH/8QAMhEAAgECAwUHAwUAAwAAAAAAAAECAxEEITESQVFhcQUTkaGx0fAUgcEiMkLh8RUzUv/aAAwDAQACEQMRAD8A7QiIvICIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiwe8AEkgACSTkABqSUBmi8Ltb2hNa4tt6eMD8byQD2NGZHMkKrZe0WpP92gwjeaZLSOwOJB8QsbSIzxdJO1/Y6GvqpbL2nSuGe8pOxDQ7i08HDcVdWSQmmroIiIZCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAvFe0vaLm06du0x7wlzv2tiB2Fx/xXtVzD2mVJu2jhSb5ueViTyIuMlak/A1Fvahog5k6+ioXdvgPI6L5SunNEA5c847FE5xJk5labFJGMk7s9D0cun2r/eNMk5ObOTm8O3nuXQqPSe1LcTqrWcWvyIPDn3SuQ0blzdDlwKje8kyTJXpSaJFCvUpXSd0dYr9MLcfBiqcwIHi6D5Kp/wCc0hm+k8CdQWujnBjyXNKNdzdD3bljVqlxklZ2me/rK99VbojuNhfU6zBUpPDmnePkQcweRVlcd6JbZdbXDTP9t5Dag3QTAd2t18RvXWrm8p0/jeBynPwGazKpGMdqTsuZaYaq6yyWfAsItLX6RMHwsc7t6vqVVq9I3/hY0dsn5EKBPtfBw/nfom/68yxjga8v4+OX9npEXn7bpHn/AHGDtb6H1W9oVmvaHNMg71vw2OoYn/qld8NH4Gqrh6lL96M0RFLNIREQBERAEREAREQBERAEREAREQBERAEREAREQBcu6TObWuar9RIaDyYIy7wSvcdL9pm3tXvaYe7qM/c7f3CT3LktO+cBGR4E/ea8Te4q+0Zt2hHq/wAfkjuKBaY1nTmrtrZgDrCSd3D+Vr3vJMkyVPRvXNEa8JWtlfJSasY3VuWHluP0VmztPxOHYPVUatUuMkyp6F25uWo4H1WWGpbNj7eWuHMfD8lJY2k9Z3cPqq1as52p7ty+0LpzeY4FORhqWybey2NjfjjqNzcOe4di9XZWuLrO0+f8KlbgCkxsQYlx/UdR2DRWbOsGk4hIPIZLksZiqdfFJyzislw66b38tkd32ZgpYbCW/m83x6a7izfWn4m94+oVeztsZk5NH3AWd5cNcIa2OcBRWtUNdJEjRRasqLrp5W355enj+CfBVFS5+fqXLyzBEtgEbuI9Vn0euHNfH4D8U7juPaq91dMIho13wAq1CphcCRPJbZV4U8TGpT3Zuzy9Hu1PCpSnRlCXme7RavZe1mPinMHdO/l2raLsqFenXhtwd18yKCpTlTlsyQREW48BERAEREAREQBERAEREAREQBERAEREAREQHkfaLTxUqTT+Zx7w2B8yua1aRaYIz+a6h7QwRbNqAThePBwI+cLl1Ss4mSc/l2LXLUpcYn37vpZF23sRHW1Pl/KqV6JaYPjxU9LaBAzEncfVQVq7nGSf4XgiR2r5lm0spEu7h9VXubcsPLcVLQvyMnZ/NQ17hztdOCBbV8yeytJ6ztNw4/wvptIe2M2l0Z8yMisLe9LcjmPNfTeEuE5NBBgcj5rEk2nY9Quqib0uj3tnaYjJ+H5r7fWeHrN+H5fwvlnWaJD+46wvt7Xacmd507lxkVQ+mvlfrnfw0+XvmfSJd533LyIrS1LzwA1P0CnvbKOs0Zbx9VFZ1g09bQ+SmvLhkQzXiEpqh9O72v1zvyyMSdTvVbTpkVra3LzA03ngrV1YZSwaajjz7VVtaoa7MSPvNW7q4p4YbmTwEQsUFRdGW1a/XPlbIVHUVRW06ZfcpUKRcYHjw5r2Gz6xc2CZcMiePNePoVMLgTmN44rfbIuKfvAG6kEacp+indi1YU565t2efhZdSP2hTco8ln7+RvURF1xRhERAEREAREQBERAEREAREQBERAEREARFq9ubeoWrZqv60dVgzc7sG4czkjaSuz1GLk9mKuz70lsxVtazMs2Eichib1m57swFyO2spbJOZGXLtU3SLpJXu3HGcNOeqxug4T+Y8z3QqtvXDRMxxGL6KJKum8kbsV2DUqwUlNKXC114/wBNFeowtMHVW7WykS7KdPVVri6LjPDT7lXKG0RHW8iM+5elUi9GUOJ7MxlBfqpvqs15fnPkU61ItMH/ALU9paYs3afNR3N0X8huH8qxb38ZOHePResyA27Zala4oFhjduKztLbEZPw/Pklzdl2UQFNYXWYYdDlPCTHes8x+pxstT3F9bFh/SdPQrG1ty88t5+96m2hVb8LXE8cyR5rGwqgZOJA3ZkDyXEOlSWI2d3XLx4f4fS3Ofd33/Nx8vbTDmPh+Sht6BeYHeeCuX1VoENcSTr1iRHiq9lVAMOJAPAkZ84SrSpfUKO7fnl4/LGITn3V95LeWWES3Mb+XNVaNIuMBX7uq0N6riSdIcT9VTtKoDsyQDrBI+SYinSVZRWS320X3/wBsKc5um3v3Fm5sIEtzjX1HornRe3l7qm4CB3/wPNRnCYDHEuOTQHE5nv0XoLG2FNgaO0niTqVb4LAwnilUirKOb3q+73a97EHE4iSouL1fpv8AbxLCIi6YqAiIgCIiAIiIAiIgCIiAIiIAiIgCjr1msaXvcGtAkkmABzKkXMfaRtovrf0wP9unBcB+J5E59gIjmTyXipUUI3JGGw7r1Nhfcv7d6cl0stiGjT3joJ/0tOnafALn9eo5zi57i5xObnEkk8ydVN/TsicRjtHoqxVfUm5anQ4ehTpK0F7lltu2Mzn2hVntgwrLaDCJxHxCrvictF5Zui7vUnp0Gxmc+1Q1WQY1U9Oi0iZPiFXqgA5aIxF56k9CmCJJ81hV6pyMjjmVnRotcNTPcoazQDAMrKbWaNVWjTrXjVSl1V/PVdVZlu0oYzwA1U9nbEXFNv6p7QDn8lUsomQ4hw7NFvdkXDXVYMSGkjt0y7pTEYjZw85P/wAs5at2JOli4OlnTclfjFLPPisrJ+PP0dtbl5gabyvt1bFh5bj971Y2fVkYcWHhGHPxGqy2hVgYcUk7jh+gXMLD0vp9vO/HLwtc6N1J97b510KVGiXGB/0pLu0LM9Rx9VJs+pmW4sM6aeZIVi9q4WxjJJ3EN055JTw9J4dzd78csuVr5iVWaqqPzqa2nTLjAGas3VkWgEZjf2+ixsKkOiYB35a9pGi3uz8AdL6g5BxaJPHRe8HhKdaGbs3lfLLxfzQ8YivKnK/vn5Gewtm+7GNw65Gn5R6lbZQuuqY1ez/cFHVv6TRJe2ORn5LraEKGGpKEZJJc14spKkqlWe007vky0i1T9v0RpiPYPUqb/wDVpxMmOOXqswx2GnfZqLLmHh6sdYsvL6q9pe06nwOB5aHwKsKRCpGpHag01yNUouLtJWYREXowEREAREQBERAEREAREQBcd6XWZF3Xk5moXdzoI8iF2JeG9onR81B/VM1Y2KgG9g0d3ZzyjgtNeN49Cd2fVUKtm7XyObQrIs8tc1WVkW36vvxUBHQydt5WcIyVhlpIzKrO1VpltInF9+KISfMrPZBgqejayJJUNQQYmVPSt5E4vvxRCTy1IatPCYUlC3xCToo6zYMTKlo0cQ+LuQN5akVelhKltGGcQJEHIjWeSjr08JiZWVCji/FCbzN/06nsdiXD60sgue0SYGrZiYHaJjithToOJwwQeeUdq8z0Rr+4vaBxZOdgPY8YR/kW+C7EoP8AwlKtLbjLZzzVr+HDzK3FYyVCVrXTWWqPC3NuWGDmNxWDGEmAM16PpKWhjchJMactcuC02zX5kCATvIJnlqFU4rBQpYrur5eee420cRKdHbsRXNqWRvB3jioWicgtreOIaZLTywnP/JUrF8O3Cd5Ex5rXXw0I1lBO1/L/AHy8D1TrSdNy1sfK9o5oBPfyKrrc1yQ0klsR+U58viWrtXw8HLXfJjzWMVhYU6iSyvx3c/nppmjWlKLbzsZ1LNwbi8RwVdbtxcBJc2P2n/ktOyp1sUDXTcO6VnGYeFNxSy6+pihWlJO+ZPTtXgB4kEZgDWOP8Lf7G2r70YXQHjuxDiOfJUetribHHCf+S1XvyH4xEgyIkab9VOjV+gnGcL2f7k9/MjSh9TFqWq0fDke4X1QWdcPY1w3jdx3qdddGSklJaMpGmnZhERZMBERAEREAREQBERAEIREByLpl0d/p65wZU39Zg4fmbPI+RC8zJ0XWfaLZF9sHtMGm8Gf0u6p8y3wXJnaqurQ2ZWR02BrSq0k5O7WRO20MahQmRkrYou/Oq1UZnOea1skxdzOnbEiZhRuBaYVllJxAIeoKwIMEyjQTu7H2lblwnRYvYWmFNRpuIBDslFcNIOZlApXdrmVGgXZrGrTLT9VLQpuIydHJYXDCIl0puF87CgxxMgwQQZ4EaLuOyb0VqNOqPxNBPJ2jh3OBHcuHW7CZh0Lp/s1qO/p3scZw1DHIOaDHjJ71Iw0rSsVvakNqmpcH6/EbDpQ0k0gBPxf/ACtFXoFhg9xXsNpUyWSIluefDf8ATwWhvj1DiA8TryVH2rgl3tSo3rZrhkrW8jXgsQ1CMEuK55u/5NUSTxKkr27mxI1+4UuzT1tBMZE/RXrknCcQaR2lVlHCxqUnNvPyVuPzImTrOE1FI1BcTvKkq2zmgOIyPl2rOyIxjIcp3LZ1CYMhsRnqmGwsasJSb/rqKtZwkopGlLjxUhtnYcUZfTj2L5RIxCRlOhOnbxW5OL9PmsYXCqsm23wy9egrVnBqyNFiOk5KVts4txAZfea+FzcUxlOk/eS3Ixfp80wuFjVctp6cPXoK1VwtbzPvRWoZe3dAPfp6eC9CtTsK2jHUiMRgdjZzHaZ8Ftl1vZVOVPCRjLnbpd2KTGTUqza5egREVgRQiIgCIiAIiIAiIgCIiAr39o2rTfSd8L2lp7xEjmuKbS2RVo1HU3gYmnxG5w5FdzWp29sKndMh0tePhe2JHLPUcvktNaltq61JuCxfcNp6Py5nFBUcMpKzZbuInJbzbXQ+7oEnB71n56YJ8Waj5c1qQypxCguLTs0dBGpGavBorB7hlJCyp0HOz+axrTJnVbrY+wLu4A903qH8buq2O0jPulEruyMzkox2m0jTS5pjRZU6TnZ+ZXTdl9AKLYdcPNZ3AdRg7hme89y3o6O2gGEW1KP2j56resNJ6kCp2pSi7RTfl6nEyHNPBZMY5x+pXUNq9ALepnTe+kf97fB2fmtIfZ3cAw24pEcSHA+EH5rw6M1uNsO0KEl+6z53PEva5h4cwus+z7Z76VrifIdVdjg6hsAN8QJ/1KtsboLTpuD69T3xBkNw4WA8xmXd+XJevW+jRcXdlfjsbGpHYh937fkxcJEcV4i6xYi1xJLSW+Bhe5XmbmmBcVOrJnENwzAPjmqztyj3kadnbO3lfTfpkeOz6my5dL/PE1NSm5pzEHVKlZx1JK2d5m04m5DfIy7FRsAMWkndu0XO1cPsVFTjLKXXzW/kWsKu1DaazXQiqUXNgkROn3xX19ZxEF0jtW1r5tOJuUceC1lqAXgETwGnis1sP3c1GEspdV46XMU6u3FtrTozB1FwAcRkd6Gu6IxZcJW4eSRBaI7Vp2YcW+J+80xGH7lpQk8+q+IzSq7ae0tPuPdOw4oy4rc7G2a9wDnkhm5s5u9ArFhRxODS0YQMxO7hC3auuz+yIbXeSbaWVs1d+3LfvK7FY2VtiKz4/N/MxAjIaLJEXRlUEREAREQBERAEREAREQBERAEREAVW52fRqf8AspU3/uY13mQrSIZTad0a6hsK1YcTbaiDx922fEhbFERJLQSk5Zt3CIiGAiIgCIiALQ9JLcgtrN/afofp4LfLCpTDgWkSDkQouMwyxFF072eqfBrQ3UKvdTUvljxFa5c7IlYQ5pBzB1C29fZHu3zBczdA8nfeawuoc04muEZzAy81yEsFV/U6rtJceXP0L1YmDtsLL5uNfVunuEE5dwURaRBgidCpLRgLoMnkN62daHCC0x2DLzWqlQlXi5ylnu1fjwR7nUVNqKWRrn3byILlCWGJjLSVJRa0uAMxy3+i22HEMGB0HICB6rNGhLEJylLTJb8/b13IxOoqVkkW+jWIsc4mcwB3DP5hblQWNsKbAwbt/EnMqddngqMqWHhCWts+upQYiop1ZSWgREUo0hERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAfCFptq7MqETTIje3TzO5fEUXF0IVqUlLhuyfzlobaNWVOaaPOCWngQVZq3zyIyHYiLglVnTvGLaTOl2Yys2ia02RVfBAAHEkfTNelsrXAMzidvMR5Ii7DsrA0qVJVVe78N27QosZiZzlsvRfOpaREVuQgiIgCIiAIiID//Z',
    'data:image/jpeg;base64,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',
    'assets/imgs/help/wr1.PNG',
    'data:image/jpeg;base64,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',
  ];
  testImgUrl;

  offloadModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: null,
    counterNumber: null,
    jalaliDay: '',
    description: ''
  }
  dataSource: IOnOffLoad[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  testAudio = new Audio();
  audioFiles: IOnOffLoad[] = [];
  downloadURL: string = '';
  showAudioControllers: boolean = false;
  isPlaying: boolean = false;
  ref: DynamicDialogRef;
  overAllInfo: IOverAllWOUIInfo;
  interationOnOverallInfo: any[] = [];

  imageFiles: IOnOffLoad[] = [];
  testLoadImage: any[] = [];

  modifyType: OffloadModify[];
  offloadItems: OffloadModify[];
  showThumbnails: boolean;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  degree: number = 0;
  @ViewChild('galleria') galleria: Galleria;

  counterStatesDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    private downloadManagerService: DownloadManagerService,
    private trackingManagerService: TrackingManagerService,
    private dialogService: DialogService,
    private sanitizer: DomSanitizer,
    public profileService: ProfileService
  ) { }

  classWrapper = async (canRefresh?: boolean) => {
    this.imageFiles = [];
    this.audioFiles = [];
    this.dataSource = [];
    this.testLoadImage = [];

    if (!this.id)
      return;

    this.dataSource = await this.downloadManagerService.downloadFileInfo(ENInterfaces.downloadFileInfo, this.id);

    this.counterStatesDictionary = await this.trackingManagerService.getCounterStateByCodeDictionary(parseInt(this.zoneId));
    this.downloadManagerService.assignToDataSource(this.dataSource);
    this.audioFiles = this.downloadManagerService.separateAudioFiles();
    this.imageFiles = this.downloadManagerService.separateImageFiles();
    this.modifyType = this.trackingManagerService.getOffloadModifyType();
    this.offloadItems = this.trackingManagerService.getOffloadItems();

    this.overAllInfo = this.downloadManagerService.getOverAllInfo();
    this.getDownloadListInfo();
    this.imageFiles.forEach((item, i) => {
      this.getExactImg(item.fileRepositoryId, i);
    })
    this.bindDocumentListeners();

  }
  ngOnChanges(): void {
    this.classWrapper();
  }
  receiveFromDateJalali = ($event: string) => {
    this.offloadModifyReq.jalaliDay = $event;
  }
  useCarouselMedia = (res, index) => {
    let unsafeImageUrl = URL.createObjectURL(res);
    console.log(unsafeImageUrl);
    // this.testImgUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    // this.testImgUrl[index] = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    // console.log(this.testImgUrl);
    this.testImgUrl[index] = unsafeImageUrl;
  }
  useSimpleMediaShow = (res, index: number) => {
    this.testLoadImage[index] = res;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.testLoadImage[index] = reader.result;
    }, false);
    if (this.testLoadImage[index]) {
      reader.readAsDataURL(this.testLoadImage[index]);
    }
  }
  getExactImg = async (id: string, index: number) => {
    if (this.testLoadImage[index])
      return;
    const res = await this.downloadManagerService.downloadFile(id);

    if (this.profileService.getUseCarouselMedia()) {
      this.useCarouselMedia(res, index);
    }
    else {
      console.log('use simple method');

      this.useSimpleMediaShow(res, index);
    }
  }
  getDownloadListInfo = () => {
    this.interationOnOverallInfo = this.downloadManagerService.getDownloadListInfo();
  }
  /* AUDIO */
  isShowAudioControllers = () => {
    this.showAudioControllers = true;
  }
  getExactAudio = async (id: string) => {
    const res = await this.downloadManagerService.downloadFile(id)
    this.downloadURL = window.URL.createObjectURL(res);
    this.testAudio.src = this.downloadURL;
    this.isShowAudioControllers();
  }
  downloadAudio = () => {
    const link = document.createElement('a');
    link.href = this.downloadURL;
    link.download = `${new Date().toLocaleDateString()}.ogg`;
    link.click();
  }
  playAudio = () => {
    this.testAudio.play();
    this.testAudio.addEventListener('ended', () => {
      this.isPlaying = false;
    });
  }
  pauseAudio = () => this.testAudio.pause();
  rePlayAudio = () => {
    this.testAudio.load();
    this.testAudio.play();
  }
  showBigImage = (data: any) => {
    this.ref = this.dialogService.open(ImageViewerComponent, {
      data: data,
      rtl: true,
      width: '80%',
      height: '100%',
      closable: true
    })
  }
  checkItems = () => {
    const offloadItems = this.trackingManagerService.selectedItems(this.offloadItems);
    this.offloadModifyReq.checkedItems = offloadItems;
  }
  assignToObject = () => {
    this.offloadModifyReq.id = this.id;
    const temp = this.convertTitleToId(this.counterStateCode);
    this.offloadModifyReq.counterStateId = temp.id;
  }
  convertTitleToId = (dataSource: any): any => {
    return this.counterStatesDictionary.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }
  connectToServer = () => {
    this.checkItems();
    this.assignToObject();
    const verificationCheck = this.trackingManagerService.verificationOffloadModify(this.offloadModifyReq);
    if (verificationCheck) {
      this.trackingManagerService.postOffloadModifyEdited(this.offloadModifyReq);
    }
  }
  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector(".p-galleria");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    else if (elem['mozRequestFullScreen']) { /* Firefox */
      elem['mozRequestFullScreen']();
    }
    else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    }
    else if (elem['msRequestFullscreen']) { /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    }
    else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    }
    else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener("fullscreenchange", this.onFullScreenListener);
    document.addEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.addEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.addEventListener("msfullscreenchange", this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener("fullscreenchange", this.onFullScreenListener);
    document.removeEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("msfullscreenchange", this.onFullScreenListener);
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  downloadImg = (src: any) => {
    console.log(src);
    const link = document.createElement('a');
    link.href = src;
    link.download = `${new Date().toLocaleDateString()}.jpg`;
    link.click();
  }
  rotateRightImg = () => {
    const a = document.querySelector('.main_img') as HTMLElement;
    this.degree += 90;
    a.style.transform = `rotate(${this.degree + 'deg'}`;
  }
  rotateLeftImg = () => {
    const a = document.querySelector('.main_img') as HTMLElement;    
    this.degree -= 90;
    a.style.transform = `rotate(${this.degree + 'deg'}`;
  }
}
