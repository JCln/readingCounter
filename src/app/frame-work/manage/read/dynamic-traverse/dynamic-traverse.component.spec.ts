import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTraverseComponent } from './dynamic-traverse.component';

describe('DynamicTraverseComponent', () => {
  let component: DynamicTraverseComponent;
  let fixture: ComponentFixture<DynamicTraverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTraverseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTraverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
