import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffloadedGroupComponent } from './offloaded-group.component';

describe('OffloadedGroupComponent', () => {
  let component: OffloadedGroupComponent;
  let fixture: ComponentFixture<OffloadedGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffloadedGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffloadedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
