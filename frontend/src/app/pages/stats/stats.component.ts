import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseChartData } from 'src/app/models/api.model';
import { StatsService } from 'src/app/services/stats.service';

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

  residenceCountry: '' | 'Italia' | 'Paesi esteri' = '';
  infrastructureType: '' | 'HOTELLIKE' | 'OTHER' = '';
  statisticsYear = '2021';
  predictionsYear = '2022';

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService
  ) {}

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

  onFilterChange() {
    this.statsService
      .getArrivals(
        this.regionName,
        this.statisticsYear,
        this.infrastructureType,
        this.residenceCountry
      )
      .subscribe((data: any) => (this.arrivalsStatsChart = data));

    this.statsService
      .getAttendances(
        this.regionName,
        this.statisticsYear,
        this.infrastructureType,
        this.residenceCountry
      )
      .subscribe((data: any) => (this.attendancesStatsChart = data));
  }
}
