import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesspreDgComponent } from './assesspre-dg.component';

describe('AssesspreDgComponent', () => {
  let component: AssesspreDgComponent;
  let fixture: ComponentFixture<AssesspreDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssesspreDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesspreDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
