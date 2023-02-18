import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbfOutputEqamatBaghComponent } from './dbf-output-eqamat-bagh.component';

describe('DbfOutputEqamatBaghComponent', () => {
  let component: DbfOutputEqamatBaghComponent;
  let fixture: ComponentFixture<DbfOutputEqamatBaghComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbfOutputEqamatBaghComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbfOutputEqamatBaghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
