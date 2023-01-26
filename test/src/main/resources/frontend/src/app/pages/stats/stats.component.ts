import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseChartData } from 'src/app/models/api.model';
import { StatsService } from 'src/app/services/stats.service';
import { PredictionsService } from 'src/app/services/predictions.service';
import { Filters } from 'src/app/models/api.model';

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

  /* we're listening to resize events to check the current
  screen size, and see if it's necessary to change the graph that 
  is currently displayed. 
  Possible performance increase: debounce this method */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.makeChartsResponsive(event.target.innerWidth);
  }

  makeChartsResponsive(width: number) {
    this.mobileCanvas = width <= 768;
  }

  ngOnInit() {
    // getting all the defaults from local storage
    this.tutorialModalOpen = localStorage.getItem('statsModalSeen') !== 'true';

    const statisticsFilters = localStorage.getItem('statisticsFilters');
    if (statisticsFilters) {
      this.statisticsFilters = JSON.parse(statisticsFilters);
    }

    const predictionsFilters = localStorage.getItem('predictionsFilters');
    if (predictionsFilters) {
      this.predictionsFilters = JSON.parse(predictionsFilters);
    }

    // collecting all the data from the resolvers
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

    /* this is listening to a custom event dispatched by the navbar. The way
    this works is that every time the language is being changed, the charts are 
    rebuilt, and this would also update the language of their current labels. We decided
    on this solution instead of manually changing the values in the chart configuartions as 
    that would have been too cumbersome and lengthy */
    window.addEventListener('languageChanged', () => {
      this.updateStatisticsCharts();
      this.updatePredictionsCharts();
    });
  }

  closeModal() {
    this.tutorialModalOpen = false;
    localStorage.setItem('statsModalSeen', 'true');
  }

  openModal() {
    this.tutorialModalOpen = true;
  }

  /* saving the currently selected filters and updating the charts to 
  reflect the changes */
  onStatisticsFilterChange() {
    localStorage.setItem(
      'statisticsFilters',
      JSON.stringify(this.statisticsFilters)
    );

    this.updateStatisticsCharts();
  }

  onPredictionsFilterChange() {
    localStorage.setItem(
      'predictionsFilters',
      JSON.stringify(this.predictionsFilters)
    );

    this.updatePredictionsCharts();
  }

  updateStatisticsCharts() {
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

  updatePredictionsCharts() {
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
