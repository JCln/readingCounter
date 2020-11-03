import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  UUid: string = '';

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.UUid = this.route.snapshot.paramMap.get('id');
    console.log(this.UUid);

  }

}
