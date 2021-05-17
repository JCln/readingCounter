import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpmEditDgComponent } from './rpm-edit-dg.component';

describe('RpmEditDgComponent', () => {
  let component: RpmEditDgComponent;
  let fixture: ComponentFixture<RpmEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpmEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpmEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
