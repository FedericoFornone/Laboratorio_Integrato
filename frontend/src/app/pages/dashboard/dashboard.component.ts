import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { readlink } from 'fs';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer') canvasContainer!: any;
  @ViewChild('barChartCanvas') barChartCanvas!: any;

  barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  public barChartLegend = true;

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
    this.route.data.subscribe(({ stats }) => {
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
          },
          {
            label: 'Esteri in hotel',
            data: foreignersInHotel,
            backgroundColor: '#F2B705',
          },

          {
            label: 'Italiani in altre strutture',
            data: italiansInOthers,
            backgroundColor: '#0B7EE7',
          },
          {
            label: 'Italiani in hotel',
            data: italiansInHotels,
            backgroundColor: '#E70B67',
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
