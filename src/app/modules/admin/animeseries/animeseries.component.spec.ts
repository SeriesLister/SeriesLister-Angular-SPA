import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeseriesComponent } from './animeseries.component';

describe('AnimeseriesComponent', () => {
  let component: AnimeseriesComponent;
  let fixture: ComponentFixture<AnimeseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimeseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
