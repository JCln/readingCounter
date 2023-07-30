import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildsParamsComponent } from './guilds-params.component';

describe('GuildsParamsComponent', () => {
  let component: GuildsParamsComponent;
  let fixture: ComponentFixture<GuildsParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildsParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildsParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
