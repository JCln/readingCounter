import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralGroupInfoResComponent } from './general-group-info-res.component';

describe('GeneralGroupInfoResComponent', () => {
  let component: GeneralGroupInfoResComponent;
  let fixture: ComponentFixture<GeneralGroupInfoResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralGroupInfoResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralGroupInfoResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
