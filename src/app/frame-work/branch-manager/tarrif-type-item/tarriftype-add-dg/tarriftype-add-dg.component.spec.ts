import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarriftypeAddDgComponent } from './tarriftype-add-dg.component';

describe('TarriftypeAddDgComponent', () => {
  let component: TarriftypeAddDgComponent;
  let fixture: ComponentFixture<TarriftypeAddDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarriftypeAddDgComponent]
    });
    fixture = TestBed.createComponent(TarriftypeAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
