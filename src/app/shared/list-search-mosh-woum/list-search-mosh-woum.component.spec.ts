import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchMoshWoumComponent } from './list-search-mosh-woum.component';

describe('ListSearchMoshWoumComponent', () => {
  let component: ListSearchMoshWoumComponent;
  let fixture: ComponentFixture<ListSearchMoshWoumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSearchMoshWoumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSearchMoshWoumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
