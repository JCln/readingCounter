import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMdSelectActionComponent } from './user-md-select-action.component';

describe('UserMdSelectActionComponent', () => {
  let component: UserMdSelectActionComponent;
  let fixture: ComponentFixture<UserMdSelectActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMdSelectActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMdSelectActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
