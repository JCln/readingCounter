import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QotrEditDgComponent } from './qotr-edit-dg.component';

describe('QotrEditDgComponent', () => {
  let component: QotrEditDgComponent;
  let fixture: ComponentFixture<QotrEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QotrEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QotrEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
