import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralGroupListModifyComponent } from './general-group-list-modify.component';

describe('GeneralGroupListModifyComponent', () => {
  let component: GeneralGroupListModifyComponent;
  let fixture: ComponentFixture<GeneralGroupListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralGroupListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralGroupListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
