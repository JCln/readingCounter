import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestReadsComponent } from './latest-reads.component';

describe('LatestReadsComponent', () => {
  let component: LatestReadsComponent;
  let fixture: ComponentFixture<LatestReadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestReadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestReadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
