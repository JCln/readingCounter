import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffloadedMasterComponent } from './offloaded-master.component';

describe('OffloadedMasterComponent', () => {
  let component: OffloadedMasterComponent;
  let fixture: ComponentFixture<OffloadedMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffloadedMasterComponent]
    });
    fixture = TestBed.createComponent(OffloadedMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
