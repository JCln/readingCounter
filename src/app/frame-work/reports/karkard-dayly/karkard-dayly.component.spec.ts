import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardDaylyComponent } from './karkard-dayly.component';

describe('KarkardDaylyComponent', () => {
  let component: KarkardDaylyComponent;
  let fixture: ComponentFixture<KarkardDaylyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardDaylyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarkardDaylyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
