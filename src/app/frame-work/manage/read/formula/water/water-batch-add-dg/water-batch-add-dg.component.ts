import { Component, OnInit } from '@angular/core';

export interface IRate {
  title: string,
  fromRate: number,
  toRate: number
}
@Component({
  selector: 'app-water-batch-add-dg',
  templateUrl: './water-batch-add-dg.component.html',
  styleUrls: ['./water-batch-add-dg.component.scss']
})
export class WaterBatchAddDgComponent implements OnInit {

  items: IRate[] = [{ title: '', fromRate: 0, toRate: null }];

  constructor() { }

  ngOnInit(): void {
  }
  addNewItem = () => {

    this.items.push({ title: '', fromRate: null, toRate: null });

  }
  removeFromItems = () => {
    this.items.pop();
  }
  download = () => {
    for (let index = 0; index < this.items.length; index++) {
      if (index > 0)
        this.items[index].fromRate = this.items[index - 1].toRate;
    }
    console.log(this.items);

  }

}
