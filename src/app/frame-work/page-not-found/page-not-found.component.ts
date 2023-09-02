import { EN_Routes } from 'interfaces/routes.enum';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  EN_Routes = EN_Routes;

}
