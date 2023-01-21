import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterMarkComponent } from './water-mark.component';

describe('WaterMarkComponent', () => {
  let component: WaterMarkComponent;
  let fixture: ComponentFixture<WaterMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
