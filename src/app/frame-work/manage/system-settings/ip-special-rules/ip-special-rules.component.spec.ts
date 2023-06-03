import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpSpecialRulesComponent } from './ip-special-rules.component';

describe('IpSpecialRulesComponent', () => {
  let component: IpSpecialRulesComponent;
  let fixture: ComponentFixture<IpSpecialRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpSpecialRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpSpecialRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
