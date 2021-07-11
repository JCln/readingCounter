import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IImportSimafaReadingProgramsReq, IReadingProgramRes } from 'interfaces/inon-manage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { InteractionService } from 'services/interaction.service';

@Component({
  selector: 'app-simafa-reading-prog',
  templateUrl: './simafa-reading-prog.component.html',
  styleUrls: ['./simafa-reading-prog.component.scss']
})
export class SimafaReadingProgComponent implements OnInit, AfterViewInit, OnDestroy {
  importSimafaReadingProgram: IImportSimafaReadingProgramsReq = {
    zoneId: 0,
    readingPeriodId: 0,
    year: 0
  }

  kindId: number = 0;
  readingPeriodKindsDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  dataSource: IReadingProgramRes[];
  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService
  ) { }

  connectToServer = async () => {
    const validation = this.importDynamicService.checkVertification(this.importSimafaReadingProgram);
    if (!validation)
      return;
  }
  nullSavedSource = () => this.closeTabService.saveDataForSimafaReadingPrograms = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.readingPeriodKindsDictionary = await this.importDynamicService.getReadingPeriodsKindDictionary();
    if (!this.importDynamicService.validationPeriodKind(this.readingPeriodKindsDictionary))
      this.readingPeriodKindsDictionary = [];
    this.zoneDictionary = await this.importDynamicService.getZoneDictionary();
    if (!this.importDynamicService.validationZoneDictionary(this.zoneDictionary))
      this.zoneDictionary = [];
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/imp/simafa/rdpg') {
          this.classWrapper(true);
        }
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}
