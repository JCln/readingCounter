import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingConfigDgComponent } from './reading-config-dg.component';

describe('ReadingConfigDgComponent', () => {
  let component: ReadingConfigDgComponent;
  let fixture: ComponentFixture<ReadingConfigDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingConfigDgComponent]
    });
    fixture = TestBed.createComponent(ReadingConfigDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
