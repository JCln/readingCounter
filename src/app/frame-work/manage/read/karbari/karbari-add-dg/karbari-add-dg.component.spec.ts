import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarbariAddDgComponent } from './karbari-add-dg.component';

describe('KarbariAddDgComponent', () => {
  let component: KarbariAddDgComponent;
  let fixture: ComponentFixture<KarbariAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarbariAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarbariAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
