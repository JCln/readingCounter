import { Component, Input } from '@angular/core';
import { IDashboardKarkardTimed } from 'interfaces/inon-manage';

@Component({
  selector: 'app-dash-karkard-table',
  templateUrl: './dash-karkard-table.component.html',
  styleUrls: ['./dash-karkard-table.component.scss']
})
export class DashKarkardTableComponent {
  @Input() dataSourceTable: IDashboardKarkardTimed[] = [];

  constructor() { }
}
