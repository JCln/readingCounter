import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTextDgComponent } from './show-text-dg.component';

describe('ShowTextDgComponent', () => {
  let component: ShowTextDgComponent;
  let fixture: ComponentFixture<ShowTextDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTextDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTextDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
