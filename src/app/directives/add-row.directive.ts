import { Directive, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[appAddRow]'
})
export class AddRowDirective {
  @Input() table: Table;
  @Input() newRow: any;
  @Input() newRowLimit: number;

  @HostListener('click', ['$event'])
  onClick(event: Event) {

    console.log(this.newRow);
    
    if (this.newRowLimit !== 1)
      return;

    // Insert a new row
    this.table.value.unshift(this.newRow);

    console.log(this.newRowLimit);
    // Set the new row in edit mode
    this.table.initRowEdit(this.newRow);

    this.newRowLimit += 1;
    event.preventDefault();
  }

}
