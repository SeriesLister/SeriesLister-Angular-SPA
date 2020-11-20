import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnimeStateComponent } from './animeseries.component';

describe('AnimeseriesComponent', () => {
  let component: AdminAnimeStateComponent;
  let fixture: ComponentFixture<AdminAnimeStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnimeStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnimeStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
