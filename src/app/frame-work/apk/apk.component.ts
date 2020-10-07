import { Component, OnInit } from '@angular/core';

import { IAPK } from './../../Interfaces/iapk';

const ELEMENT_DATA: IAPK[] = [
  { name: 'اول', version: 'v.0.0.1', file: '' },
  { name: 'دوم', version: 'V.0.0.2', file: '' },
  { name: 'سوم', version: 'v.0.0.3', file: '' },
  { name: 'چهارم', version: 'v.0.0.4', file: '' }
];
@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit {
  displayedColumns: string[] = ['name', 'version'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
