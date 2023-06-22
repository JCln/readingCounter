import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifListBydateComponent } from './notif-list-bydate.component';

describe('NotifListBydateComponent', () => {
  let component: NotifListBydateComponent;
  let fixture: ComponentFixture<NotifListBydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifListBydateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifListBydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
