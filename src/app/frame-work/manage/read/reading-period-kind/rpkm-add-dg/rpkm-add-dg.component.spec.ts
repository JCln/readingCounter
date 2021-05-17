import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpkmAddDgComponent } from './rpkm-add-dg.component';

describe('RpkmAddDgComponent', () => {
  let component: RpkmAddDgComponent;
  let fixture: ComponentFixture<RpkmAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpkmAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpkmAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
