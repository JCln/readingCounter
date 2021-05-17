import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpmAddDgComponent } from './rpm-add-dg.component';

describe('RpmAddDgComponent', () => {
  let component: RpmAddDgComponent;
  let fixture: ComponentFixture<RpmAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpmAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpmAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
