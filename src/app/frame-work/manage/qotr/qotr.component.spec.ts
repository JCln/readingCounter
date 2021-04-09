import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QotrComponent } from './qotr.component';

describe('QotrComponent', () => {
  let component: QotrComponent;
  let fixture: ComponentFixture<QotrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QotrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QotrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
