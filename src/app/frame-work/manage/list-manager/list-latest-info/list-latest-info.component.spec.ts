import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLatestInfoComponent } from './list-latest-info.component';

describe('ListLatestInfoComponent', () => {
  let component: ListLatestInfoComponent;
  let fixture: ComponentFixture<ListLatestInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListLatestInfoComponent]
    });
    fixture = TestBed.createComponent(ListLatestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
