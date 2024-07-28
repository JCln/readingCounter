import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDgComponent } from './tag-dg.component';

describe('TagDgComponent', () => {
  let component: TagDgComponent;
  let fixture: ComponentFixture<TagDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagDgComponent]
    });
    fixture = TestBed.createComponent(TagDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
