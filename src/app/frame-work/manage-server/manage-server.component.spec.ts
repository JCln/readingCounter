import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServerComponent } from './manage-server.component';

describe('ManageServerComponent', () => {
  let component: ManageServerComponent;
  let fixture: ComponentFixture<ManageServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
