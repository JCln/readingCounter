import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingConfigComponent } from './reading-config.component';

describe('ReadingConfigComponent', () => {
  let component: ReadingConfigComponent;
  let fixture: ComponentFixture<ReadingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
