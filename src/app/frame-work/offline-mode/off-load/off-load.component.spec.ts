import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffLoadComponent } from './off-load.component';

describe('OffLoadComponent', () => {
  let component: OffLoadComponent;
  let fixture: ComponentFixture<OffLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
