import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrAddDgComponent } from './cr-add-dg.component';

describe('CrAddDgComponent', () => {
  let component: CrAddDgComponent;
  let fixture: ComponentFixture<CrAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
