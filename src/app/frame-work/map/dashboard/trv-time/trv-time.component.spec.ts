import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrvTimeComponent } from './trv-time.component';

describe('TrvTimeComponent', () => {
  let component: TrvTimeComponent;
  let fixture: ComponentFixture<TrvTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrvTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrvTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
