import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTableComponent } from './import-table.component';

describe('ImportTableComponent', () => {
  let component: ImportTableComponent;
  let fixture: ComponentFixture<ImportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
