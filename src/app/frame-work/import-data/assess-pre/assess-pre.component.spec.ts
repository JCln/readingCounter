import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessPreComponent } from './assess-pre.component';

describe('AssessPreComponent', () => {
  let component: AssessPreComponent;
  let fixture: ComponentFixture<AssessPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessPreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
