import { Directive, HostListener, Input } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { Table } from 'primeng/table';
import { UtilsService } from 'services/utils.service';

@Directive({
  selector: '[appAddRow]'
})
export class AddRowDirective {
  constructor(
    private utilsService: UtilsService
  ) { }
  @Input() table: Table;
  @Input() newRow: object;
  @Input() newRowLimit: number;

  measureRowEdit = (): number => {
    // if there is filtered value, then first clear all filters.
    if (this.table.hasFilter()) {
      this.utilsService.clearFilters(this.table);
    }
    return this.table._first;
  }
  @HostListener('click', ['$event'])
  onClick(event: Event) {

    if (this.newRowLimit !== 1) {
      this.utilsService.snackBarMessageWarn(EN_messages.alreadyOneItemEditing);
      return;
    }

    // Insert a new row
    this.table.value.splice(this.measureRowEdit(), 0, this.newRow);
    // Set the new row in edit mode
    this.table.initRowEdit(this.newRow);

    this.newRowLimit += 1;
    event.preventDefault();
  }

}
