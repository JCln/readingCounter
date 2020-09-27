import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'foo', loadChildren: () => import('./foo/foo.module').then(foo => foo.FooModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then(t => t.TestModule) },
  { path: 'table', loadChildren: () => import('./table/table.module').then(tb => tb.TableModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameWorkRoutingModule { }
