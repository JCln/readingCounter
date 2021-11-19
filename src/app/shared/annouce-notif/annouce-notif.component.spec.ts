import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouceNotifComponent } from './annouce-notif.component';

describe('AnnouceNotifComponent', () => {
  let component: AnnouceNotifComponent;
  let fixture: ComponentFixture<AnnouceNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouceNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouceNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
