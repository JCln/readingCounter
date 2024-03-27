import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLazyEditComponent } from './client-lazy-edit.component';

describe('ClientLazyEditComponent', () => {
  let component: ClientLazyEditComponent;
  let fixture: ComponentFixture<ClientLazyEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientLazyEditComponent]
    });
    fixture = TestBed.createComponent(ClientLazyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
