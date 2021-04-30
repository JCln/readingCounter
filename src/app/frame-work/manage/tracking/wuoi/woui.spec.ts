import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WouiComponent } from './woui.component';

describe('WouiComponent', () => {
  let component: WouiComponent;
  let fixture: ComponentFixture<WouiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WouiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WouiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
