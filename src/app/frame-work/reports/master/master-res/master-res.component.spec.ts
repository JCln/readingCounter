import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterResComponent } from './master-res.component';

describe('MasterResComponent', () => {
  let component: MasterResComponent;
  let fixture: ComponentFixture<MasterResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
