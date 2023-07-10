import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonyHeaderComponent } from './anony-header.component';

describe('AnonyHeaderComponent', () => {
  let component: AnonyHeaderComponent;
  let fixture: ComponentFixture<AnonyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
