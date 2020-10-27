import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLevelsComponent } from './auth-levels.component';

describe('AuthLevelsComponent', () => {
  let component: AuthLevelsComponent;
  let fixture: ComponentFixture<AuthLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
