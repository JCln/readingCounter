import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpkmEditDgComponent } from './rpkm-edit-dg.component';

describe('RpkmEditDgComponent', () => {
  let component: RpkmEditDgComponent;
  let fixture: ComponentFixture<RpkmEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpkmEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpkmEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
