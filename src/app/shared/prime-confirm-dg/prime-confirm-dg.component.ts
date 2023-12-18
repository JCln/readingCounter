import { Component, OnInit } from '@angular/core';
import { IPrimeConfirmDialog } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-prime-confirm-dg',
  templateUrl: './prime-confirm-dg.component.html',
  styleUrls: ['./prime-confirm-dg.component.scss']
})
export class PrimeConfirmDgComponent implements OnInit {
  dataSource: IPrimeConfirmDialog;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.dataSource = this.config.data;
  }
  close() {
    this.ref.close();
  }
  confirmed = () => {
    this.ref.close(true);
  }

}