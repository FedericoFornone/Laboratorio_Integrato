import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseChartData } from 'src/app/models/api.model';
import { StatsService } from 'src/app/services/stats.service';
import { PredictionsService } from 'src/app/services/predictions.service';

interface Filters {
  residenceCountry: '' | 'Italia' | 'Paesi esteri';
  infrastructureType: '' | 'HOTELLIKE' | 'OTHER';
  statisticsYear?: string;
  predictionsYear?: string;
  covidIncluded?: boolean;
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
    covidIncluded: false,
  };

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService,
    private predictionsService: PredictionsService
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

    const statisticsFilters = localStorage.getItem('statisticsFilters');
    if (statisticsFilters) {
      this.statisticsFilters = JSON.parse(statisticsFilters);
    }

    const predictionsFilters = localStorage.getItem('predictionsFilters');
    if (predictionsFilters) {
      this.predictionsFilters = JSON.parse(predictionsFilters);
    }

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
    localStorage.setItem(
      'statisticsFilters',
      JSON.stringify(this.statisticsFilters)
    );

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

  onPredictionsFilterChange() {
    localStorage.setItem(
      'predictionsFilters',
      JSON.stringify(this.predictionsFilters)
    );

    this.predictionsService
      .getArrivals(
        this.regionName,
        this.predictionsFilters.predictionsYear,
        this.predictionsFilters.infrastructureType,
        this.predictionsFilters.residenceCountry,
        this.predictionsFilters.covidIncluded ? 'yes' : 'no'
      )
      .subscribe((data: any) => (this.arrivalsPredictionsChart = data));

    this.predictionsService
      .getAttendances(
        this.regionName,
        this.predictionsFilters.predictionsYear,
        this.predictionsFilters.infrastructureType,
        this.predictionsFilters.residenceCountry,
        this.predictionsFilters.covidIncluded ? 'yes' : 'no'
      )
      .subscribe((data: any) => (this.attendancesPredictionsChart = data));
  }
}
