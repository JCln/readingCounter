import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashErrorCountComponent } from './dash-error-count.component';

describe('DashErrorCountComponent', () => {
  let component: DashErrorCountComponent;
  let fixture: ComponentFixture<DashErrorCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashErrorCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashErrorCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
