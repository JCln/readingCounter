import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportListDgComponent } from './import-list-dg.component';

describe('ImportListDgComponent', () => {
  let component: ImportListDgComponent;
  let fixture: ComponentFixture<ImportListDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportListDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportListDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
