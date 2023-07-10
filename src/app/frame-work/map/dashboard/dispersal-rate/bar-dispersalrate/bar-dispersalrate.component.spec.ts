import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDispersalrateComponent } from './bar-dispersalrate.component';

describe('BarDispersalrateComponent', () => {
  let component: BarDispersalrateComponent;
  let fixture: ComponentFixture<BarDispersalrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDispersalrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDispersalrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
