import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnlinesImgDgComponent } from './user-onlines-img-dg.component';

describe('UserOnlinesImgDgComponent', () => {
  let component: UserOnlinesImgDgComponent;
  let fixture: ComponentFixture<UserOnlinesImgDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOnlinesImgDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOnlinesImgDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
