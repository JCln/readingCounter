import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrPreNumberShownComponent } from './rr-pre-number-shown.component';

describe('RrPreNumberShownComponent', () => {
  let component: RrPreNumberShownComponent;
  let fixture: ComponentFixture<RrPreNumberShownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrPreNumberShownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrPreNumberShownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
