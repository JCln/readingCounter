import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashKarkardComponent } from './dash-karkard.component';

describe('DashKarkardComponent', () => {
  let component: DashKarkardComponent;
  let fixture: ComponentFixture<DashKarkardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashKarkardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashKarkardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
