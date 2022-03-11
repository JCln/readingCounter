import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoumComponent } from './woum.component';

describe('WoumComponent', () => {
  let component: WoumComponent;
  let fixture: ComponentFixture<WoumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WoumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
