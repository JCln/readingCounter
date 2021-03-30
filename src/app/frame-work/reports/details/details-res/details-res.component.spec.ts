import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsResComponent } from './details-res.component';

describe('DetailsResComponent', () => {
  let component: DetailsResComponent;
  let fixture: ComponentFixture<DetailsResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
