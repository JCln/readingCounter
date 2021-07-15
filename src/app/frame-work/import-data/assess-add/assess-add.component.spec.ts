import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessAddComponent } from './assess-add.component';

describe('AssessAddComponent', () => {
  let component: AssessAddComponent;
  let fixture: ComponentFixture<AssessAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
