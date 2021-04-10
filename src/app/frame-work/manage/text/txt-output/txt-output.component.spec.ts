import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtOutputComponent } from './txt-output.component';

describe('TxtOutputComponent', () => {
  let component: TxtOutputComponent;
  let fixture: ComponentFixture<TxtOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxtOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
