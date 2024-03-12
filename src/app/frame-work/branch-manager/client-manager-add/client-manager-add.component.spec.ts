import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerAddComponent } from './client-manager-add.component';

describe('ClientManagerAddComponent', () => {
  let component: ClientManagerAddComponent;
  let fixture: ComponentFixture<ClientManagerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientManagerAddComponent]
    });
    fixture = TestBed.createComponent(ClientManagerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
