import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorsComponent } from './server-errors.component';

describe('ServerErrorsComponent', () => {
  let component: ServerErrorsComponent;
  let fixture: ComponentFixture<ServerErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
