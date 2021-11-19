import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffloadComponent } from './offload.component';

describe('OffloadComponent', () => {
  let component: OffloadComponent;
  let fixture: ComponentFixture<OffloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
