import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiphonComponent } from './siphon.component';

describe('SiphonComponent', () => {
  let component: SiphonComponent;
  let fixture: ComponentFixture<SiphonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiphonComponent]
    });
    fixture = TestBed.createComponent(SiphonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
