import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = '';

  constructor(private readonly interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.setPageTitle('مدیریت کاربران');
  }

}
