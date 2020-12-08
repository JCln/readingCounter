import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2AddDgComponent } from './auth2-add-dg.component';

describe('Auth2AddDgComponent', () => {
  let component: Auth2AddDgComponent;
  let fixture: ComponentFixture<Auth2AddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2AddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth2AddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
