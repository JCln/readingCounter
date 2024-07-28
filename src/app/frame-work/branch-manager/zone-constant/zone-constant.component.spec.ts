import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneConstantComponent } from './zone-constant.component';

describe('ZoneConstantComponent', () => {
  let component: ZoneConstantComponent;
  let fixture: ComponentFixture<ZoneConstantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneConstantComponent]
    });
    fixture = TestBed.createComponent(ZoneConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
