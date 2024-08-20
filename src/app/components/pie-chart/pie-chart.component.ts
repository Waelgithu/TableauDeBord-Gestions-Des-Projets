import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartData, Color } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  
  public pieChartColors = [
    {
      backgroundColor: ['#CF1F46', '#626060'],
    },
  ];

  
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: '#ffffff',
        formatter: (value: number) => value.toString(),
        font: {
          weight: 'bold',
          size: 14,
        },
      },
    },
  };

  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels as any];
  @Input() pieChartLabels!: string[];
  @Input() pieChartData!: ChartData<'pie'>;
  public pieChartType: ChartType = 'pie';
}
