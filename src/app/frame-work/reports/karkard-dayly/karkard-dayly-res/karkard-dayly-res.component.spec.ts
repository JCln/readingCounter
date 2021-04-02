import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardDaylyResComponent } from './karkard-dayly-res.component';

describe('KarkardDaylyResComponent', () => {
  let component: KarkardDaylyResComponent;
  let fixture: ComponentFixture<KarkardDaylyResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardDaylyResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarkardDaylyResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
