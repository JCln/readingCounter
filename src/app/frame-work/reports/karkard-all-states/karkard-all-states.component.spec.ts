import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardAllStatesComponent } from './karkard-all-states.component';

describe('KarkardAllStatesComponent', () => {
  let component: KarkardAllStatesComponent;
  let fixture: ComponentFixture<KarkardAllStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardAllStatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarkardAllStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
