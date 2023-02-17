import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideoDgComponent } from './show-video-dg.component';

describe('ShowVideoDgComponent', () => {
  let component: ShowVideoDgComponent;
  let fixture: ComponentFixture<ShowVideoDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVideoDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVideoDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
