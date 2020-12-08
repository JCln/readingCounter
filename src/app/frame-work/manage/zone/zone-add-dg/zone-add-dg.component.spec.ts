import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAddDgComponent } from './zone-add-dg.component';

describe('ZoneAddDgComponent', () => {
  let component: ZoneAddDgComponent;
  let fixture: ComponentFixture<ZoneAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
