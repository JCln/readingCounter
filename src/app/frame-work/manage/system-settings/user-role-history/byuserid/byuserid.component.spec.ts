import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByuseridComponent } from './byuserid.component';

describe('ByuseridComponent', () => {
  let component: ByuseridComponent;
  let fixture: ComponentFixture<ByuseridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ByuseridComponent]
    });
    fixture = TestBed.createComponent(ByuseridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
