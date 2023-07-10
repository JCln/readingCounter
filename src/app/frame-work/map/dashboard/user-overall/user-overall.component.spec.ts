import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverallComponent } from './user-overall.component';

describe('UserOverallComponent', () => {
  let component: UserOverallComponent;
  let fixture: ComponentFixture<UserOverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOverallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
