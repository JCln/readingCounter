import { Component, Input } from '@angular/core';
import { IForbiddenManager } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { InteractionService } from 'services/interaction.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-forb-res',
  templateUrl: './forb-res.component.html',
  styleUrls: ['./forb-res.component.scss']
})
export class ForbResComponent extends FactoryONE {
  @Input() dataSource: IForbiddenManager[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private forbiddenService: ForbiddenService,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
    super(interactionService);
  }

  private insertSelectedColumns = () => {
    this._selectCols = this.forbiddenService.columnSelectedMenuDefault();
    this._selectedColumns = this.forbiddenService.customizeSelectedColumns(this._selectCols);
  }
  nullSavedSource = () => this.closeTabService.saveDataForForbidden = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    // if (this.closeTabService.saveDataForForbidden) {
    //   this.dataSource = this.closeTabService.saveDataForForbidden;
    // }
    // else {
    this.dataSource = await this.forbiddenService.getDataSource();
    this.closeTabService.saveDataForForbidden = this.dataSource;
    // }
    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.forbiddenService.setDynamicPartRanges(this.dataSource);
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  backToPrevious = () => {
    this.forbiddenService.backToParent();
  }
  showPictures = (forbiddenId: string) => {
    this.forbiddenService.routeToWOUI(forbiddenId, true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
