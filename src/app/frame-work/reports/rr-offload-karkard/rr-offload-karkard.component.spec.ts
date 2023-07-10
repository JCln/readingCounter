import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrOffloadKarkardComponent } from './rr-offload-karkard.component';

describe('RrOffloadKarkardComponent', () => {
  let component: RrOffloadKarkardComponent;
  let fixture: ComponentFixture<RrOffloadKarkardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrOffloadKarkardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrOffloadKarkardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
