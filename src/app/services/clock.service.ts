import { AfterViewInit, ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClockService implements AfterViewInit {
  @ViewChild('hourHand', { static: false }) hourHand: ElementRef;
  @ViewChild('minuteHand', { static: false }) minuteHand: ElementRef;
  @ViewChild('secondHand', { static: false }) secondHand: ElementRef;

  isRunning = true;
  timerId: any;

  date: Date;
  hour: number;
  minute: number;
  second: number;

  ngAfterViewInit() {
    this.timerId = this.getTime();
  }

  animateAnalogClock() {
    this.hourHand.nativeElement.style.transform
      = `translate3d(-50%, 0, 0) rotate(${(this.hour * 30) + (this.minute * 0.5) + (this.second * (0.5 / 60))}deg)`;
    this.minuteHand.nativeElement.style.transform
      = `translate3d(-50%, 0, 0) rotate(${(this.minute * 6) + (this.second * 0.1)}deg)`;
    this.secondHand.nativeElement.style.transform
      = `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)`;
  }

  getTime() {
    return setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();

      this.animateAnalogClock();
    }, 1000);

  }

  toggle() {
    if (this.isRunning) {
      clearInterval(this.timerId);
    } else { this.getTime(); }

    this.isRunning = !this.isRunning;
  }
}
