import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGetLazyComponent } from './client-get-lazy.component';

describe('ClientGetLazyComponent', () => {
  let component: ClientGetLazyComponent;
  let fixture: ComponentFixture<ClientGetLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientGetLazyComponent]
    });
    fixture = TestBed.createComponent(ClientGetLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
