import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrEditDgComponent } from './cr-edit-dg.component';

describe('CrEditDgComponent', () => {
  let component: CrEditDgComponent;
  let fixture: ComponentFixture<CrEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
