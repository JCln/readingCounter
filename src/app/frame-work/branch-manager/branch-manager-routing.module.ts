import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'state', loadChildren: () => import('./state/state.module').then(state => state.StateModule) },
  { path: 'customerType', loadChildren: () => import('./customer-type/customer-type.module').then(customerType => customerType.CustomerTypeModule) },
  { path: 'waterSource', loadChildren: () => import('./water-source/water-source.module').then(waterSource => waterSource.WaterSourceModule) },
  { path: 'ownershipType', loadChildren: () => import('./ownership-type/ownership-type.module').then(ownershipType => ownershipType.OwnershipTypeModule) },
  { path: 'clients', loadChildren: () => import('./client-manager/client-manager.module').then(clientManagerGet => clientManagerGet.ClientManagerModule) },
  { path: 'siphon', loadChildren: () => import('./siphon/siphon.module').then(siphonManager => siphonManager.SiphonModule) },
  { path: 'addClients', loadChildren: () => import('./client-manager-add/client-manager-add.module').then(addClientManager => addClientManager.ClientManagerAddModule) },
  { path: 'clientLazy', loadChildren: () => import('./client-get-lazy/client-get-lazy.module').then(clientGetLazy => clientGetLazy.ClientGetLazyModule) },
  { path: 'tarrifTypes', loadChildren: () => import('./tarrif-type-item/tarrif-type-item.module').then(tarrifTypeItemsManager => tarrifTypeItemsManager.TarrifTypeItemModule) },
  { path: 'tarrifParameter', loadChildren: () => import('./tariff-parameter/tariff-parameter.module').then(tarrifParameterManager => tarrifParameterManager.TariffParameterModule) },
  { path: 'offering', loadChildren: () => import('./offering/offering.module').then(offering => offering.OfferingModule) },
  { path: 'offeringUnit', loadChildren: () => import('./offering-unit/offering-unit.module').then(offeringUnit => offeringUnit.OfferingUnitModule) },
  { path: 'offeringGroup', loadChildren: () => import('./offering-group/offering-group.module').then(offeringGroup => offeringGroup.OfferingGroupModule) },
  { path: 'requestDraft', loadChildren: () => import('./request-draft/request-draft.module').then(requestDraft => requestDraft.RequestDraftModule) },
  { path: 'requestDraftLazy', loadChildren: () => import('./request-draft-getlazy/request-draft-getlazy.module').then(requestDraftGetLazy => requestDraftGetLazy.RequestDraftGetlazyModule) },
  { path: 'tariff', loadChildren: () => import('./tariff-manager/tariff-manager.module').then(tariffManager => tariffManager.TariffManagerModule) },
  { path: 'bank', loadChildren: () => import('./bank/bank.module').then(bankManager => bankManager.BankModule) },
  { path: 'tariffType', loadChildren: () => import('./tariff-type/tariff-type.module').then(tariffTypeManager => tariffTypeManager.TariffTypeModule) },
  { path: 'scheduledPaymentMethod', loadChildren: () => import('./scheduled-payment-method/scheduled-payment-method.module').then(scheduledPaymentMethod => scheduledPaymentMethod.ScheduledPaymentMethodModule) },
  { path: 'village', loadChildren: () => import('./village/village.module').then(villageModule => villageModule.VillageModule) },
  { path: 'invoiceType', loadChildren: () => import('./invoice-type/invoice-type.module').then(invoiceTypeManager => invoiceTypeManager.InvoiceTypeModule) },
  { path: 'counterNumberChange', loadChildren: () => import('./counter-number-change/counter-number-change.module').then(counterNumberChange => counterNumberChange.CounterNumberChangeModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagerRoutingModule { }
