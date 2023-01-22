import { ChartConfiguration, ChartOptions } from 'chart.js';

export interface ApiModel {
  Attendance: number;
  Arrivals: number;
  ResidenceCountry: string;
  Infrastructure: string;
  Region: string;
  Date: string;
}

export interface ResponseChartData {
  chartData: ChartConfiguration<'bar'>['data'];
  options: ChartOptions<'bar'>;
  mobileOptions: ChartOptions<'bar'>;
  legend: boolean;
}
