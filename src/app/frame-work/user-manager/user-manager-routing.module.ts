import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'all', loadChildren: () => import('./all-contacts/all-contacts.module').then(allcontacts => allcontacts.AllContactsModule) },
  { path: 'add', loadChildren: () => import('./add-contact/add-contact.module').then(addContacts => addContacts.AddContactModule) },
  { path: 'edit', loadChildren: () => import('./edit-contact/edit-contact.module').then(editContacts => editContacts.EditContactModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
