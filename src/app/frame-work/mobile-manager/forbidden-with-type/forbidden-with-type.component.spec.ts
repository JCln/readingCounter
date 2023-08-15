import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenWithTypeComponent } from './forbidden-with-type.component';

describe('ForbiddenWithTypeComponent', () => {
  let component: ForbiddenWithTypeComponent;
  let fixture: ComponentFixture<ForbiddenWithTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenWithTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForbiddenWithTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
