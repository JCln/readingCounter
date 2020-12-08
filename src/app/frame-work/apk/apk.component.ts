import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';

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
export class ApkComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'version', 'file'];
  dataSource = ELEMENT_DATA;

  constructor(
    private interactionService: InteractionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res && res.length !== 0) {
        if (res === this.router.url)
          this.ngOnInit();
      }
    })
  }

}
