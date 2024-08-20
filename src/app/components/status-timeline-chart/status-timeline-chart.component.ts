import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-status-timeline-chart',
  templateUrl: './status-timeline-chart.component.html',
  styleUrls: ['./status-timeline-chart.component.css']
})
export class StatusTimelineChartComponent implements OnChanges {
  @Input() chartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Status Count'
        }
      }
    }
  };

  lineChartColors = [
    {
      borderColor: '#FF6384',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }
  ];

  lineChartLegend = true;
  lineChartType: 'line' = 'line';  // Set this as a string type with value 'line'

  constructor(private cdr: ChangeDetectorRef) {}  // Inject ChangeDetectorRef

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {  // Use the correct way to access the changed property
      this.cdr.detectChanges();  // Force change detection to ensure the chart updates
    }
  }
}
