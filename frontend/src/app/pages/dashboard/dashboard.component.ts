import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit {
  barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartOptions<'bar'> = {
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
  barChartLegend = true;

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
      this.barChartOptions = {
        ...this.barChartOptions,
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
      this.barChartOptions = {
        ...this.barChartOptions,
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
    this.barChartOptions = {
      ...this.barChartOptions,
      plugins: {
        ...this.barChartOptions.plugins,
        title: {
          ...this.barChartOptions.plugins?.title,
          text: 'Arrivi in ' + this.selectedRegion,
        },
      },
    };

    this.apiService
      .getStats(this.selectedRegion, this.infrastructure, this.residenceCountry)
      .subscribe((stats) => {
        this.barChartData = {
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
        this.barChartData = {
          labels: this.labels,
          datasets: [...stats],
        };
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ stats, windowSize }) => {
      this.makeGraphResponsive(windowSize);

      this.barChartData = {
        labels: this.labels,
        datasets: [...stats],
      };
    });
  }
}
