import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardGridComponent } from './karkard-grid.component';

describe('KarkardGridComponent', () => {
  let component: KarkardGridComponent;
  let fixture: ComponentFixture<KarkardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarkardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
