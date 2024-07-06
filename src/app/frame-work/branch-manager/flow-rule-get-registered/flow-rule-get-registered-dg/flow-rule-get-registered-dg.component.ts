import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IRequestDraft } from 'interfaces/i-branch';
import { IDictionaryManager, IObjectIteratation } from 'interfaces/ioverall-config';
import { MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-flow-rule-get-registered-dg',
  templateUrl: './flow-rule-get-registered-dg.component.html',
  styleUrls: ['./flow-rule-get-registered-dg.component.scss']
})
export class FlowRuleGetRegisteredDgComponent extends FactoryONE {
  private readonly _outputFileName: string = 'flowRuleGetRegisteredStepperEditColumns';
  _selectCols: any = [];
  items: MenuItem[];

  qotrDictionary: IDictionaryManager[] = [];
  siphonDictionary: any[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  usageDictionary: IDictionaryManager[] = [];
  branchDiameterDictionary: IDictionaryManager[] = [];
  guildDictionary: IDictionaryManager[] = [];
  ownershipTypeDictionary: IDictionaryManager[] = [];
  branchStateDictionary: IDictionaryManager[] = [];
  waterSourceDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  }
  dictionaryWrapper = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.siphonDictionary = await this.branchesService.dictionaryWrapperService.getSiphonDictionary(false);
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  addStepperItems(): void {
    this.items = [
      {
        label: 'ویرایش',
        routerLink: 'edit'
      },
      {
        label: 'محاسبه شده',
        routerLink: 'calculated'
      },
      {
        label: 'کسورات اضافات',
        routerLink: 'extras'
      },
      {
        label: 'تقسیط/ روش پرداخت',
        routerLink: 'installment'
      },
      {
        label: 'محاسبه مجدد',
        routerLink: 'reCalc'
      },
      {
        label: 'تایید',
        routerLink: 'confirmation'
      }
    ];
  }
  classWrapper = async () => {
    console.log(1);

    this.addStepperItems();
  }

}