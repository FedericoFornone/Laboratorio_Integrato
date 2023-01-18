import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chartCanvas: any;
  @ViewChild('chartContainer') chartContainer: any;
  regionName!: string;
  tutorialModalOpen = false;
  arrivalsStatsChart: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.tutorialModalOpen = localStorage.getItem('statsModalSeen') !== 'true';

    this.route.data.subscribe(({ stats, region }) => {
      this.arrivalsStatsChart = stats;
      this.regionName = region;
    });
  }

  ngAfterViewInit() {
    this.chartCanvas.nativeElement.width =
      this.chartContainer.nativeElement.clientWidth;
    this.chartCanvas.nativeElement.height =
      this.chartContainer.nativeElement.clientHeight;
  }

  closeModal() {
    this.tutorialModalOpen = false;
    localStorage.setItem('statsModalSeen', 'true');
  }

  openModal() {
    this.tutorialModalOpen = true;
  }
}
