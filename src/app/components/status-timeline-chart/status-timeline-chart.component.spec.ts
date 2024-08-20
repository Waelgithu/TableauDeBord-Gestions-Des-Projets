import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTimelineChartComponent } from './status-timeline-chart.component';

describe('StatusTimelineChartComponent', () => {
  let component: StatusTimelineChartComponent;
  let fixture: ComponentFixture<StatusTimelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusTimelineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTimelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
