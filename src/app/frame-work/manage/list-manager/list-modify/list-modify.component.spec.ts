import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModifyComponent } from './list-modify.component';

describe('ListModifyComponent', () => {
  let component: ListModifyComponent;
  let fixture: ComponentFixture<ListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
