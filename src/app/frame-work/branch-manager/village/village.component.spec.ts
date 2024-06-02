import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageComponent } from './village.component';

describe('VillageComponent', () => {
  let component: VillageComponent;
  let fixture: ComponentFixture<VillageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillageComponent]
    });
    fixture = TestBed.createComponent(VillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
