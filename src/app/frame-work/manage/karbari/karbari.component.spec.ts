import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarbariComponent } from './karbari.component';

describe('KarbariComponent', () => {
  let component: KarbariComponent;
  let fixture: ComponentFixture<KarbariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarbariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarbariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
