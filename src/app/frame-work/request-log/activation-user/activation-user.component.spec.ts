import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationUserComponent } from './activation-user.component';

describe('ActivationUserComponent', () => {
  let component: ActivationUserComponent;
  let fixture: ComponentFixture<ActivationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
