import { AbsoluteSourceSpan } from '@angular/compiler';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit {
  arrivalsChartData!: ChartConfiguration<'bar'>['data'];
  arrivalsChartOptions: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Arrivi in Abruzzo',
        font: {
          size: 26,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
  arrivalsChartLegend = true;

  predictionsChartData!: ChartConfiguration<'bar'>['data'];
  predictionsChartOptions: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Previsioni arrivi in Abruzzo',
        font: {
          size: 26,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
  predictionsChartLegend = true;

  selectedRegion = 'Abruzzo';
  selectedArrivals = 'Tutti gli arrivi';
  infrastructure = '';
  residenceCountry = '';

  labels = [
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  makeGraphResponsive(width: number) {
    if (width < 1024) {
      this.arrivalsChartOptions = {
        ...this.arrivalsChartOptions,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            ticks: {
              display: false,
            },
          },
        },
      };
    } else {
      this.arrivalsChartOptions = {
        ...this.arrivalsChartOptions,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
          },
        },
      };
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.makeGraphResponsive(event.target.innerWidth);
  }

  onRegionChange() {
    this.arrivalsChartOptions = {
      ...this.arrivalsChartOptions,
      plugins: {
        ...this.arrivalsChartOptions.plugins,
        title: {
          ...this.arrivalsChartOptions.plugins?.title,
          text: 'Arrivi in ' + this.selectedRegion,
        },
      },
    };

    this.apiService
      .getStats(this.selectedRegion, this.infrastructure, this.residenceCountry)
      .subscribe((stats) => {
        this.arrivalsChartData = {
          labels: this.labels,
          datasets: [...stats],
        };
      });
  }

  onArrivalsChange() {
    switch (this.selectedArrivals) {
      case 'Tutti gli arrivi':
        this.infrastructure = '';
        this.residenceCountry = '';
        break;
      case 'Italiani in hotel':
        this.infrastructure = 'HOTELLIKE';
        this.residenceCountry = 'Italia';
        break;
      case 'Italiani in altre strutture':
        this.infrastructure = 'OTHER';
        this.residenceCountry = 'Italia';
        break;
      case 'Esteri in hotel':
        this.infrastructure = 'HOTELLIKE';
        this.residenceCountry = 'Paesi esteri';
        break;
      case 'Esteri in altre strutture':
        this.infrastructure = 'OTHER';
        this.residenceCountry = 'Paesi esteri';
        break;
    }

    this.apiService
      .getStats(this.selectedRegion, this.infrastructure, this.residenceCountry)
      .subscribe((stats) => {
        this.arrivalsChartData = {
          labels: this.labels,
          datasets: [...stats],
        };
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ stats, predictions, windowSize }) => {
      this.makeGraphResponsive(windowSize);

      this.predictionsChartData = {
        labels: [...predictions.labels],
        datasets: [...predictions.datasets],
      };

      this.arrivalsChartData = {
        labels: this.labels,
        datasets: [...stats],
      };
    });
  }
}
