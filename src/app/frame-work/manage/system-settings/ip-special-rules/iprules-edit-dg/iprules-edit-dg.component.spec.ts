import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IprulesEditDgComponent } from './iprules-edit-dg.component';

describe('IprulesEditDgComponent', () => {
  let component: IprulesEditDgComponent;
  let fixture: ComponentFixture<IprulesEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IprulesEditDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IprulesEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
