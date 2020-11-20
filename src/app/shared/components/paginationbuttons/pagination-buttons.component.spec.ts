import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationButtonsComponent } from './pagination-buttons.component';

describe('PagebuttonsComponent', () => {
  let component: PaginationButtonsComponent;
  let fixture: ComponentFixture<PaginationButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
