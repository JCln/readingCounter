import { Directive, Host, Optional, Self } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[appUnSortTable]'
})
export class UnSortTableDirective {
  defaultSortOrderInitialized = false;

  constructor(@Host() @Self() @Optional() public pTable: Table) {

    pTable.tableService.valueSource$.subscribe((val: any[]) => {
      if (val != null && val.length > 0 && !this.defaultSortOrderInitialized) {
        let i = 0;
        val.forEach(v => {
          v['_defaultSortOrder'] = i++;
        });
        this.defaultSortOrderInitialized = true;
      }
    });

    pTable.sort = (event: any) => {
      if (pTable.sortMode === 'single') {
        if (pTable.sortField === event.field && pTable.sortOrder === -1) {
          event.field = '_defaultSortOrder';
        }

        pTable._sortOrder = (pTable.sortField === event.field) ? pTable.sortOrder * -1 : pTable.defaultSortOrder;
        pTable._sortField = event.field;
        pTable.sortSingle();
      }

      if (pTable.isStateful()) {
        pTable.saveState();
      }

      pTable.anchorRowIndex = null;
    };
  }

}
