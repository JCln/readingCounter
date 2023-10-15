import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeMessageDgComponent } from './code-message-dg.component';

describe('CodeMessageDgComponent', () => {
  let component: CodeMessageDgComponent;
  let fixture: ComponentFixture<CodeMessageDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeMessageDgComponent]
    });
    fixture = TestBed.createComponent(CodeMessageDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
