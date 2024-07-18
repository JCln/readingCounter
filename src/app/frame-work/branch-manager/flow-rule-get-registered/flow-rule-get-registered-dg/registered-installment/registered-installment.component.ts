import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-registered-installment',
  templateUrl: './registered-installment.component.html',
  styleUrls: ['./registered-installment.component.scss']
})
export class RegisteredInstallmentComponent extends FactoryONE {
  private readonly _outputFileNamePostal: string = 'flowRuleInstallment';
  private readonly _outputFileNameBillId: string = 'flowRuleInstallmentTwo';
  ownershipTypeDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];
  paymentMethod: any[] = [];
  _selectedPaymentMethod: any;
  _selectColsPostal: any = [];
  _selectColsBillId: any = [];
  submitted: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  dictionaryWrapper = async () => {
    this.paymentMethod = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.scheduledPaymentMethodAll);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  insertSelectedColumns = () => {
    this._selectColsBillId = this.branchesService.columnManager.getColumnsMenus(this._outputFileNameBillId);
    this._selectColsPostal = this.branchesService.columnManager.getColumnsMenus(this._outputFileNamePostal);
  }
  classWrapper = async () => {
    this.insertSelectedColumns();
    this.dictionaryWrapper();
  }
  async nextPage() {
    console.log(this.closeTabService.requestDraftReq.postalCode);
    console.log(this.closeTabService.requestDraftReq.billId);
    if (this._selectedPaymentMethod) {
      if (this.branchesService.verificationService.flowRuleInstallment(this.closeTabService.requestDraftReq)) {
        // const req = { postalCode: this.closeTabService.requestDraftReq.postalCode };
        // call api to complete available datas
        // const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.CustomerLocationManagerGetPostalCode, req);
        // console.log(res);

        this.closeTabService.utilsService.routeToByUrl(EN_Routes.flowRuleGetRegisteredStepReCalc);
      } else {
        this.submitted = true;
      }
    }
    else {
      if (this.branchesService.verificationService.flowRuleInstallment(this.closeTabService.requestDraftReq)) {
        // const req = { neighbourBillId: this.closeTabService.requestDraftReq.billId };
        // const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.CustomerLocationManagerGetNeighbourBillId, req);
        // console.log(res);

        this.closeTabService.utilsService.routeToByUrl(EN_Routes.flowRuleGetRegisteredStepReCalc);
      } else {
        this.submitted = true;
      }
    }
  }
  showProperItems() {
    // TODO: triggered proper items on click payment method
  }

}
