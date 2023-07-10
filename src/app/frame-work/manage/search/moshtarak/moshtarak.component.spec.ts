import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoshtarakComponent } from './moshtarak.component';

describe('MoshtarakComponent', () => {
  let component: MoshtarakComponent;
  let fixture: ComponentFixture<MoshtarakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoshtarakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoshtarakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
