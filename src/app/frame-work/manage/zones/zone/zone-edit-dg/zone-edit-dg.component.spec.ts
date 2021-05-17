import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneEditDgComponent } from './zone-edit-dg.component';

describe('ZoneEditDgComponent', () => {
  let component: ZoneEditDgComponent;
  let fixture: ComponentFixture<ZoneEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
