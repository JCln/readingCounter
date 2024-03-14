import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEntityComponent } from './inactive-entity.component';

describe('InactiveEntityComponent', () => {
  let component: InactiveEntityComponent;
  let fixture: ComponentFixture<InactiveEntityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactiveEntityComponent]
    });
    fixture = TestBed.createComponent(InactiveEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
