import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneBoundComponent } from './zone-bound.component';

describe('ZoneBoundComponent', () => {
  let component: ZoneBoundComponent;
  let fixture: ComponentFixture<ZoneBoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneBoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneBoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
