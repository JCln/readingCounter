import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { InteractionService } from 'services/interaction.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  _years: ITitleValue[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  constructor(
    private interactionService: InteractionService,
    public forbiddenService: ForbiddenService,
    public route: ActivatedRoute,
    private closeTabService: CloseTabService
  ) { }

  classWrapper = async () => {
    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
    this._years = this.forbiddenService.getYears();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/fbn') {
          this.classWrapper();
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
  routeToChild = () => {
    this.forbiddenService.routeToChild();
  }
  verification = async () => {
    const temp = this.forbiddenService.verificationForbidden(this.forbiddenService.forbiddenReq);
    if (temp)
      this.routeToChild();
  }

}