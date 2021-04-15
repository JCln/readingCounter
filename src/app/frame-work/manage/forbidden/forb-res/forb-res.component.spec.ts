import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbResComponent } from './forb-res.component';

describe('ForbResComponent', () => {
  let component: ForbResComponent;
  let fixture: ComponentFixture<ForbResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
