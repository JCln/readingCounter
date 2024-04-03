import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarriftypeEditDgComponent } from './tarriftype-edit-dg.component';

describe('TarriftypeEditDgComponent', () => {
  let component: TarriftypeEditDgComponent;
  let fixture: ComponentFixture<TarriftypeEditDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarriftypeEditDgComponent]
    });
    fixture = TestBed.createComponent(TarriftypeEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
