import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnonymousComponent } from './list-anonymous.component';

describe('ListAnonymousComponent', () => {
  let component: ListAnonymousComponent;
  let fixture: ComponentFixture<ListAnonymousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnonymousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
