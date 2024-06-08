import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { MenuItem } from 'primeng/api';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-client-manager-add',
  templateUrl: './client-manager-add.component.html',
  styleUrls: ['./client-manager-add.component.scss']
})
export class ClientManagerAddComponent extends FactoryONE {
  private readonly _outputFileName: string = 'clientManagerAdd';
  _selectCols: any = [];
  _selectColsAccordion: any = [];
  items: MenuItem[];
  hasStepperView: boolean;

  qotrDictionary: IDictionaryManager[] = [];
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
        label: 'راهنما',// توضیح اضافه برای عنوان اضافه بشه در افزودن کاربر
        routerLink: 'desc'
      },
      // {
      //   label: 'نوع خدمت',
      //   routerLink: 'offering'
      // },
      {
        label: 'اطلاعات مالک',
        routerLink: 'personal'
      },
      {
        label: 'اطلاعات فنی',
        routerLink: 'technical'
      },
      {
        label: 'اطلاعات ملک',
        routerLink: 'others'
      },
      {
        label: 'اطلاعات مکانی',
        routerLink: 'location'
      },
      {
        label: 'تایید',
        routerLink: 'confirmation'
      }
    ];
  }
  stepperViewStatus(): void {
    this.hasStepperView = this.closeTabService.profileService.getStepperView();
  }
  classWrapper = async () => {
    this.addStepperItems();
    this.stepperViewStatus();
  }

}