import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbDanUploadedInfoComponent } from './ab-dan-uploaded-info.component';

describe('AbDanUploadedInfoComponent', () => {
  let component: AbDanUploadedInfoComponent;
  let fixture: ComponentFixture<AbDanUploadedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbDanUploadedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbDanUploadedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
