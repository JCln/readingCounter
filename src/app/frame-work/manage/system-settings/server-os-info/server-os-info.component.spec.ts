import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerOsInfoComponent } from './server-os-info.component';

describe('ServerOsInfoComponent', () => {
  let component: ServerOsInfoComponent;
  let fixture: ComponentFixture<ServerOsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerOsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerOsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
