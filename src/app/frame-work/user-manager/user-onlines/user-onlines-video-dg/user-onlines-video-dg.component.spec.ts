import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnlinesVideoDgComponent } from './user-onlines-video-dg.component';

describe('UserOnlinesVideoDgComponent', () => {
  let component: UserOnlinesVideoDgComponent;
  let fixture: ComponentFixture<UserOnlinesVideoDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOnlinesVideoDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOnlinesVideoDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
