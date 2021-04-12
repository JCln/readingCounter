import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrvchResComponent } from './trvch-res.component';

describe('TrvchResComponent', () => {
  let component: TrvchResComponent;
  let fixture: ComponentFixture<TrvchResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrvchResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrvchResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
