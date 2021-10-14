import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAllDetailsComponent } from './gallery-all-details.component';

describe('GalleryAllDetailsComponent', () => {
  let component: GalleryAllDetailsComponent;
  let fixture: ComponentFixture<GalleryAllDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryAllDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
