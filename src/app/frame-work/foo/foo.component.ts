import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

export interface IMulti {
  id: number;
  title: string;
  isChecked?: boolean;
  subCollection?: IMulti[];
}

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {
  title: string = '';
  allComplete: boolean = false;
  datas: IMulti =
    {
      id: 12, title: 'اصفهان', isChecked: true, subCollection: [
        {
          id: 12, title: 'لنجان', isChecked: true, subCollection: [
            { id: 12, title: 'زرین شهر', isChecked: true },
            { id: 12, title: 'فولادشهر', isChecked: true }
          ]
        },
        {
          id: 12, title: 'test', isChecked: true, subCollection: [
            { id: 12, title: 'پیربکران', isChecked: true },
            { id: 12, title: 'کلیشاد', isChecked: true },
            { id: 12, title: 'سودرجان', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true }
          ]
        },
        {
          id: 12, title: 'تست', isChecked: true, subCollection: [
            { id: 12, title: 'پیربکران', isChecked: true },
            { id: 12, title: 'کلیشاد', isChecked: true },
            { id: 12, title: 'سودرجان', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true }
          ]
        },
        {
          id: 12, title: 'فلاورجان', isChecked: true, subCollection: [
            { id: 12, title: 'پیربکران', isChecked: true },
            { id: 12, title: 'کلیشاد', isChecked: true },
            { id: 12, title: 'سودرجان', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true }
          ]
        },
        {
          id: 12, title: 'تست', isChecked: true, subCollection: [
            { id: 12, title: 'پیربکران', isChecked: true },
            { id: 12, title: 'کلیشاد', isChecked: true },
            { id: 12, title: 'سودرجان', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true },
            { id: 12, title: '..', isChecked: true }
          ]
        },
      ]
    }

  constructor(private readonly interactionService: InteractionService) { }

  getL2Status = (): boolean => {
    const a: Array<IMulti> = [];
    a.push(this.datas);

    const b = a.map(item => {
      return item.subCollection.every(sub_item => {
        return sub_item.subCollection.every(sub_2 => {
          return sub_2.isChecked
        })
      })
    })
    return b.pop();
  }

  updateAllComplete() {
    this.allComplete = this.datas.subCollection != null && this.datas.subCollection.every(t => t.isChecked) && this.getL2Status();
  }

  someComplete(): boolean {
    const a: Array<IMulti> = [];
    a.push(this.datas);

    // const b = a.map(item => {
    //   return item.subCollection.map(sub_item => {
    //     return sub_item.subCollection.filter(sub_2 => {
    //       sub_2.isChecked.length > 0
    //     })
    //   })
    // })

    if (this.datas.subCollection == null) {
      return false;
    }
    // const b = a.map(s => {
    //   s.subCollection.filter(item1 => {
    //     return item1.subCollection.filter(item2 => {
    //       return item2.subCollection.filter(item3 => {
    //         return item3.isChecked
    //       })
    //     })
    //   })
    // })
    // console.log(b);

    return this.datas.subCollection.filter(t => t.isChecked).length > 0 && !this.allComplete

  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.datas.subCollection == null) {
      return;
    }
    this.datas.subCollection.forEach(t => {
      t.isChecked = completed,
        t.subCollection.forEach(y => {
          y.isChecked = completed
        })
    });
  }

  setAllL2(completed: boolean, subtask: IMulti) {
    subtask.subCollection.forEach(t => {
      t.isChecked = completed
    });
  }
  ngOnInit(): void {
  }

}
