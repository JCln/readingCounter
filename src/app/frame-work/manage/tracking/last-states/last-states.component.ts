import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITracking } from 'interfaces/imanage';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-last-states',
  templateUrl: './last-states.component.html',
  styleUrls: ['./last-states.component.scss']
})
export class LastStatesComponent extends FactoryONE {
  dataSource: ITracking[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService
  ) {
    super(interactionService);
  }

  nullSavedSource = () => this.closeTabService.saveDataForLastStates = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForLastStates) {
      this.dataSource = this.closeTabService.saveDataForLastStates;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingLASTSTATES);
      this.closeTabService.saveDataForLastStates = this.dataSource;
    }
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnlastStates();
    this._selectedColumns = this.trackingManagerService.customizeSelectedColumns(this._selectCols);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  showInMap = (trackNumberAndDate: object) => {
    this.trackingManagerService.routeToLMPDXY(trackNumberAndDate['trackNumber'], trackNumberAndDate['insertDateJalali']);
  }

}
