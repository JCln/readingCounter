import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarbariEditDgComponent } from './karbari-edit-dg.component';

describe('KarbariEditDgComponent', () => {
  let component: KarbariEditDgComponent;
  let fixture: ComponentFixture<KarbariEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarbariEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarbariEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
