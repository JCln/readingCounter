import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrfmResComponent } from './prfm-res.component';

describe('PrfmResComponent', () => {
  let component: PrfmResComponent;
  let fixture: ComponentFixture<PrfmResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrfmResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrfmResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
