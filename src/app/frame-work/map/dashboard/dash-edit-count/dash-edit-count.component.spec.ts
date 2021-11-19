import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEditCountComponent } from './dash-edit-count.component';

describe('DashEditCountComponent', () => {
  let component: DashEditCountComponent;
  let fixture: ComponentFixture<DashEditCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashEditCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashEditCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
