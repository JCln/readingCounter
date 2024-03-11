import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerComponent } from './client-manager.component';

describe('ClientManagerComponent', () => {
  let component: ClientManagerComponent;
  let fixture: ComponentFixture<ClientManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientManagerComponent]
    });
    fixture = TestBed.createComponent(ClientManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
