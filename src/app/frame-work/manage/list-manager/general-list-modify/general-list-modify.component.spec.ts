import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralListModifyComponent } from './general-list-modify.component';

describe('GeneralListModifyComponent', () => {
  let component: GeneralListModifyComponent;
  let fixture: ComponentFixture<GeneralListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
