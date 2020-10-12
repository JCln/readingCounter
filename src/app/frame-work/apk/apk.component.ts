import { Component, OnInit } from '@angular/core';

import { IAPK } from './../../Interfaces/iapk';

const ELEMENT_DATA: IAPK[] = [
  { name: 'اول', version: 'v.0.0.1', file: 'f' },
  { name: 'دوم', version: 'V.0.0.2', file: 's' },
  { name: 'سوم', version: 'v.0.0.3', file: 'long name' },
  { name: 'چهارم', version: 'v.0.0.4', file: 'another long name' }
];
@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit {
  displayedColumns: string[] = ['name', 'version', 'file'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
