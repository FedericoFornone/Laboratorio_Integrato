import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseChartData } from 'src/app/models/api.model';
import { StatsService } from 'src/app/services/stats.service';

interface Filters {
  residenceCountry: '' | 'Italia' | 'Paesi esteri';
  infrastructureType: '' | 'HOTELLIKE' | 'OTHER';
  statisticsYear?: string;
  predictionsYear?: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  regionName!: string;
  tutorialModalOpen = false;
  arrivalsStatsChart!: ResponseChartData;
  attendancesStatsChart!: ResponseChartData;
  arrivalsPredictionsChart!: ResponseChartData;
  attendancesPredictionsChart!: ResponseChartData;
  mobileCanvas = false;

  statisticsFilters: Filters = {
    residenceCountry: '',
    infrastructureType: '',
    statisticsYear: '2021',
  };

  predictionsFilters: Filters = {
    residenceCountry: '',
    infrastructureType: '',
    predictionsYear: '2022',
  };

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

    this.route.data.subscribe((data) => {
      const {
        arrivalsStats,
        attendancesStats,
        arrivalsPredictions,
        attendancesPredictions,
        region,
        windowSize,
      } = data;

      this.arrivalsStatsChart = arrivalsStats;
      this.attendancesStatsChart = attendancesStats;
      this.arrivalsPredictionsChart = arrivalsPredictions;
      this.attendancesPredictionsChart = attendancesPredictions;
      this.regionName = region;
      this.makeChartsResponsive(windowSize);
    });
  }

  closeModal() {
    this.tutorialModalOpen = false;
    localStorage.setItem('statsModalSeen', 'true');
  }

  openModal() {
    this.tutorialModalOpen = true;
  }

  onStatisticsFilterChange() {
    this.statsService
      .getArrivals(
        this.regionName,
        this.statisticsFilters.statisticsYear,
        this.statisticsFilters.infrastructureType,
        this.statisticsFilters.residenceCountry
      )
      .subscribe((data: any) => (this.arrivalsStatsChart = data));

    this.statsService
      .getAttendances(
        this.regionName,
        this.statisticsFilters.statisticsYear,
        this.statisticsFilters.infrastructureType,
        this.statisticsFilters.residenceCountry
      )
      .subscribe((data: any) => (this.attendancesStatsChart = data));
  }
}
