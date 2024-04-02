import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarrifTypeItemComponent } from './tarrif-type-item.component';

describe('TarrifTypeItemComponent', () => {
  let component: TarrifTypeItemComponent;
  let fixture: ComponentFixture<TarrifTypeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarrifTypeItemComponent]
    });
    fixture = TestBed.createComponent(TarrifTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
