import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  regionName!: string;
  tutorialModalOpen = false;
  arrivalsStatsChart!: {
    chartData: ChartConfiguration<'bar'>['data'];
    options: ChartOptions<'bar'>;
    legend: boolean;
  };
  attendancesStatsChart!: {
    chartData: ChartConfiguration<'bar'>['data'];
    options: ChartOptions<'bar'>;
    legend: boolean;
  };
  mobileCanvas = false;
  mobileOptions: ChartOptions<'bar'> = {};

  constructor(private route: ActivatedRoute) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.makeChartsResponsive(event.target.innerWidth);
  }

  makeChartsResponsive(width: number) {
    this.mobileCanvas = width <= 768;
    this.mobileOptions = {
      ...this.arrivalsStatsChart.options,
      indexAxis: 'y',
    };
  }

  ngOnInit() {
    this.tutorialModalOpen = localStorage.getItem('statsModalSeen') !== 'true';

    this.route.data.subscribe(
      ({ arrivals, attendances, region, windowSize }) => {
        this.arrivalsStatsChart = arrivals;
        this.attendancesStatsChart = attendances;
        this.regionName = region;
        this.makeChartsResponsive(windowSize);
      }
    );
  }

  closeModal() {
    this.tutorialModalOpen = false;
    localStorage.setItem('statsModalSeen', 'true');
  }

  openModal() {
    this.tutorialModalOpen = true;
  }
}
