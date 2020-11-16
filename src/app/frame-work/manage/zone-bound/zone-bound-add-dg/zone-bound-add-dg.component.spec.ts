import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneBoundAddDgComponent } from './zone-bound-add-dg.component';

describe('ZoneBoundAddDgComponent', () => {
  let component: ZoneBoundAddDgComponent;
  let fixture: ComponentFixture<ZoneBoundAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneBoundAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneBoundAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
