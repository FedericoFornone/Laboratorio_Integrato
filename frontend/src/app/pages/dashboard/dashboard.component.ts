import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class StatsComponent implements OnInit {
  lineChartConfig: any;
  currentSlide: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.lineChartConfig = data.stats;
    });
  }

  previousSlide() {
    if (this.currentSlide === 0) {
      return;
    }
    this.currentSlide--;
  }

  nextSlide() {
    if (this.currentSlide === 2) {
      return;
    }
    this.currentSlide++;
  }
}
