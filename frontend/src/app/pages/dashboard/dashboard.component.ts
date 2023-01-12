import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer') canvasContainer!: any;
  @ViewChild('barChartCanvas') barChartCanvas!: any;

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

  constructor(private route: ActivatedRoute) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 1024) {
      this.barChartOptions = {
        ...this.barChartOptions,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
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

  getArrivals(
    data: any,
    region: string,
    residenceCountry: 'Italia' | 'Paesi esteri',
    infrastructure: 'HOTELLIKE' | 'OTHER'
  ): number[] {
    const regionData = data.filter((d: any) => d['Region'] === region);
    const tourists = regionData.filter(
      (d: any) =>
        d['ResidenceCountry'] === residenceCountry &&
        d['Infrastructure'] === infrastructure
    );

    const arrivals = tourists.map((d: any) => d['Arrivals']);
    return arrivals;
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ stats, windowSize }) => {
      if (windowSize < 1024) {
        this.barChartOptions = {
          ...this.barChartOptions,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        };
      }

      const italiansInHotels = this.getArrivals(
        stats,
        'Abruzzo',
        'Italia',
        'HOTELLIKE'
      );
      const foreignersInHotel = this.getArrivals(
        stats,
        'Abruzzo',
        'Paesi esteri',
        'HOTELLIKE'
      );
      const italiansInOthers = this.getArrivals(
        stats,
        'Abruzzo',
        'Italia',
        'OTHER'
      );
      const foreignersInOthers = this.getArrivals(
        stats,
        'Abruzzo',
        'Paesi esteri',
        'OTHER'
      );

      this.barChartData = {
        labels: this.labels,
        datasets: [
          {
            label: 'Esteri in altre strutture',
            data: foreignersInOthers,
            backgroundColor: '#0BE7A3',
            borderRadius: 5,
          },
          {
            label: 'Esteri in hotel',
            data: foreignersInHotel,
            backgroundColor: '#F2B705',
            borderRadius: 5,
          },

          {
            label: 'Italiani in altre strutture',
            data: italiansInOthers,
            backgroundColor: '#0B7EE7',
            borderRadius: 5,
          },
          {
            label: 'Italiani in hotel',
            data: italiansInHotels,
            backgroundColor: '#E70B67',
            borderRadius: 5,
          },
        ],
      };
    });
  }

  ngAfterViewInit(): void {
    this.barChartCanvas.nativeElement.width =
      this.canvasContainer.nativeElement.clientWidth;
    this.barChartCanvas.nativeElement.height =
      this.canvasContainer.nativeElement.clientHeight;
  }
}
