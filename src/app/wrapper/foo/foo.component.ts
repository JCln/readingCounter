import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {
  title: string = '';

  constructor(private readonly interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.setPageTitle('foo');
  }

}
