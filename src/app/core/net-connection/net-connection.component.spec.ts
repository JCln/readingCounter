import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetConnectionComponent } from './net-connection.component';

describe('NetConnectionComponent', () => {
  let component: NetConnectionComponent;
  let fixture: ComponentFixture<NetConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
