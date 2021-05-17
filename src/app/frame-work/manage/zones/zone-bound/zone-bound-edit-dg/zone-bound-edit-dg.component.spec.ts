import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneBoundEditDgComponent } from './zone-bound-edit-dg.component';

describe('ZoneBoundEditDgComponent', () => {
  let component: ZoneBoundEditDgComponent;
  let fixture: ComponentFixture<ZoneBoundEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneBoundEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneBoundEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
