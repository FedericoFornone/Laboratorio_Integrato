import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  regionName!: string;
  tutorialModalOpen = false;
  arrivalsStatsChart: any;

  constructor(private route: ActivatedRoute) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.makeChartResponsive(event.target.innerWidth);
  }

  makeChartResponsive(width: number) {
    if (width < 768) {
      this.arrivalsStatsChart.options = {
        ...this.arrivalsStatsChart.options,
        indexAxis: 'y',
      };
    }
  }

  ngOnInit() {
    this.tutorialModalOpen = localStorage.getItem('statsModalSeen') !== 'true';

    this.route.data.subscribe(({ stats, region }) => {
      this.arrivalsStatsChart = stats;
      this.regionName = region;
    });
  }

  closeModal() {
    this.tutorialModalOpen = false;
    localStorage.setItem('statsModalSeen', 'true');
  }

  openModal() {
    this.tutorialModalOpen = true;
  }
}
