import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContactsComponent } from './all-contacts.component';

describe('AllContactsComponent', () => {
  let component: AllContactsComponent;
  let fixture: ComponentFixture<AllContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
