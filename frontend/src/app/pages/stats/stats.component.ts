import { Component, OnInit } from '@angular/core';
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
