import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HfcComponent } from './hfc.component';

describe('HfcComponent', () => {
  let component: HfcComponent;
  let fixture: ComponentFixture<HfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
