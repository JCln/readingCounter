import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTimeComponent } from './read-time.component';

describe('ReadTimeComponent', () => {
  let component: ReadTimeComponent;
  let fixture: ComponentFixture<ReadTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
