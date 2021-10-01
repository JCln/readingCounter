import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogsComponent } from './add-dialogs.component';

describe('AddDialogsComponent', () => {
  let component: AddDialogsComponent;
  let fixture: ComponentFixture<AddDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDialogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
