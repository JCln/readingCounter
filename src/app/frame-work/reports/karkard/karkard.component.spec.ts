import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardComponent } from './karkard.component';

describe('KarkardComponent', () => {
  let component: KarkardComponent;
  let fixture: ComponentFixture<KarkardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarkardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
