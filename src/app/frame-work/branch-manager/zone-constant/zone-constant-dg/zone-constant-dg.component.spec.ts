import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneConstantDgComponent } from './zone-constant-dg.component';

describe('ZoneConstantDgComponent', () => {
  let component: ZoneConstantDgComponent;
  let fixture: ComponentFixture<ZoneConstantDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneConstantDgComponent]
    });
    fixture = TestBed.createComponent(ZoneConstantDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
