import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchMoshDgComponent } from './list-search-mosh-dg.component';

describe('ListSearchMoshDgComponent', () => {
  let component: ListSearchMoshDgComponent;
  let fixture: ComponentFixture<ListSearchMoshDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSearchMoshDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSearchMoshDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
