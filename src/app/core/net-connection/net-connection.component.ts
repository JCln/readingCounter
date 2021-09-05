import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-net-connection',
  templateUrl: './net-connection.component.html',
  styleUrls: ['./net-connection.component.scss']
})
export class NetConnectionComponent implements OnInit {
  @Input() isOnline: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
