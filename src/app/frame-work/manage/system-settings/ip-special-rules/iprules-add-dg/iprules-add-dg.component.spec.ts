import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IprulesAddDgComponent } from './iprules-add-dg.component';

describe('IprulesAddDgComponent', () => {
  let component: IprulesAddDgComponent;
  let fixture: ComponentFixture<IprulesAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IprulesAddDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IprulesAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
