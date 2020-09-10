import { Component, OnInit } from '@angular/core';

import { InteractionService } from './../../services/interaction.service';

@Component({
  selector: 'app-frame-work',
  templateUrl: './frame-work.component.html',
  styleUrls: ['./frame-work.component.scss']
})
export class FrameWorkComponent implements OnInit {
  title: string = '';

  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.getPageTitle().subscribe(title => this.title = title)
  }

}
