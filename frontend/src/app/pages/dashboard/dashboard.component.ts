import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer') canvasContainer!: any;
  @ViewChild('lineChartCanvas') lineChartCanvas!: any;

  lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
  };
  public lineChartLegend = true;

  labels = [
    '2008',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2009',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2010',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2011',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2012',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2013',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2014',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2015',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2016',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2017',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2018',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2019',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2020',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ stats }) => {
      const abruzzo = stats.filter((d: any) => d['Region'] === 'Abruzzo');
      const italiansInHotels = abruzzo.filter(
        (d: any) =>
          d['ResidenceCountry'] === 'Italia' &&
          d['Infrastructure'] === 'HOTELLIKE'
      );

      const arrivals = italiansInHotels.map((d: any) => d['Arrivals']);

      this.lineChartData = {
        labels: this.labels,
        datasets: [
          {
            label: 'Italiani in hotel',
            fill: false,
            tension: 0.5,
            borderColor: '#E70B67',
            backgroundColor: 'rgba(255,0,0,0.3)',
            data: [...arrivals],
          },
        ],
      };
    });
  }

  ngAfterViewInit(): void {
    this.lineChartCanvas.nativeElement.width =
      this.canvasContainer.nativeElement.clientWidth;
    this.lineChartCanvas.nativeElement.height =
      this.canvasContainer.nativeElement.clientHeight;

    console.log(this.lineChartCanvas.nativeElement.width);
    console.log(this.lineChartCanvas.nativeElement.height);
    console.log(this.canvasContainer.nativeElement.clientWidth);
    console.log(this.canvasContainer.nativeElement.clientHeight);
  }
}
