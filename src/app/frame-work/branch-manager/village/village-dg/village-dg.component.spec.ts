import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageDgComponent } from './village-dg.component';

describe('VillageDgComponent', () => {
  let component: VillageDgComponent;
  let fixture: ComponentFixture<VillageDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillageDgComponent]
    });
    fixture = TestBed.createComponent(VillageDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
