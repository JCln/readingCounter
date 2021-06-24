import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDgComponentComponent } from './search-dg-component.component';

describe('SearchDgComponentComponent', () => {
  let component: SearchDgComponentComponent;
  let fixture: ComponentFixture<SearchDgComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDgComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDgComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
