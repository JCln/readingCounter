import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKarkardComponent } from './user-karkard.component';

describe('UserKarkardComponent', () => {
  let component: UserKarkardComponent;
  let fixture: ComponentFixture<UserKarkardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKarkardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKarkardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
