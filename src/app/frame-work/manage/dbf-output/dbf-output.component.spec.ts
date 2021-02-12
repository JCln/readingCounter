import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbfOutputComponent } from './dbf-output.component';

describe('DbfOutputComponent', () => {
  let component: DbfOutputComponent;
  let fixture: ComponentFixture<DbfOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbfOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbfOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
