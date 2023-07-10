import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMdSelectZoneComponent } from './user-md-select-zone.component';

describe('UserMdSelectZoneComponent', () => {
  let component: UserMdSelectZoneComponent;
  let fixture: ComponentFixture<UserMdSelectZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMdSelectZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMdSelectZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
