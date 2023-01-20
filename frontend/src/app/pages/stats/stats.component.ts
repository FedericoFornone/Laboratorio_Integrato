import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseChartData } from 'src/app/models/api.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  regionName!: string;
  tutorialModalOpen = false;
  arrivalsStatsChart!: ResponseChartData;
  attendancesStatsChart!: ResponseChartData;
  mobileCanvas = false;

  constructor(private route: ActivatedRoute) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.makeChartsResponsive(event.target.innerWidth);
  }

  makeChartsResponsive(width: number) {
    this.mobileCanvas = width <= 768;
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
