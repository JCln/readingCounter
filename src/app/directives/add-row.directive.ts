import { Directive, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[appAddRow]'
})
export class AddRowDirective {
  @Input() table: Table;
  @Input() newRow: object;
  @Input() newRowLimit: number;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    if (this.newRowLimit !== 1)
      return;

    // Insert a new row
    this.table.value.unshift(this.newRow);
    // Set the new row in edit mode
    this.table.initRowEdit(this.newRow);

    this.newRowLimit += 1;
    event.preventDefault();
  }

}
