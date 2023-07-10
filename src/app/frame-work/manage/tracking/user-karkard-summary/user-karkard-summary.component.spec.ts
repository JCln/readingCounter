import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKarkardSummaryComponent } from './user-karkard-summary.component';

describe('UserKarkardSummaryComponent', () => {
  let component: UserKarkardSummaryComponent;
  let fixture: ComponentFixture<UserKarkardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKarkardSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKarkardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
