import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTinymceComponent } from './test-tinymce.component';

describe('TestTinymceComponent', () => {
  let component: TestTinymceComponent;
  let fixture: ComponentFixture<TestTinymceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTinymceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTinymceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
