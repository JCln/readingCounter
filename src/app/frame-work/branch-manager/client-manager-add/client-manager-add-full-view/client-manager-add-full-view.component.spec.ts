import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerAddFullViewComponent } from './client-manager-add-full-view.component';

describe('ClientManagerAddFullViewComponent', () => {
  let component: ClientManagerAddFullViewComponent;
  let fixture: ComponentFixture<ClientManagerAddFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientManagerAddFullViewComponent]
    });
    fixture = TestBed.createComponent(ClientManagerAddFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
