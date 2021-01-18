import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements OnInit, OnDestroy {
  @Input() dataSource = new MatTableDataSource();
  @Input() desc: any;

  subscription: Subscription[] = [];

  columnsToDisplay = [
    'insertDateJalali',
    'userDisplayName',
    'seen',
    'counterReaderName',
    'trackStatusTitle',
    'hasDetails',
    'actions'
  ];
  filterValues = {
    insertDateJalali: '',
    userDisplayName: '',
    seen: '',
    counterReaderName: '',
    trackStatusTitle: '',
    hasDetails: ''
  };

  constructor(
    private snackWrapperService: SnackWrapperService,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) { }


  nullSavedSource = () => this.closeTabService.saveDataForFollowUp = null;
  // classWrapper = () => {
  //   this.dataSource = this.importedDataSource.changeHistory;
  // }
  ngOnInit() {
    // this.classWrapper();
    console.log(this.desc);

  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}