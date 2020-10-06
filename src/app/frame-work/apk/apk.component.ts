import { Component, OnInit } from '@angular/core';

const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079 },
  { position: 2, name: 'Helium', weight: 4.0026 },
  { position: 3, name: 'Lithium', weight: 6.941 },
  { position: 4, name: 'Beryllium', weight: 9.0122 }
];
@Component({
  selector: 'app-apk',
  templateUrl: './apk.component.html',
  styleUrls: ['./apk.component.scss']
})
export class ApkComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
