import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardResComponent } from './karkard-res.component';

describe('KarkardResComponent', () => {
  let component: KarkardResComponent;
  let fixture: ComponentFixture<KarkardResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarkardResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
