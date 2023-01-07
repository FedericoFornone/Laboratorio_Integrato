import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit {
  currentSlide: number = 0;
  numberOfSlides: number = 3;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {});
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.numberOfSlides) {
      this.currentSlide++;
    }
  }
}
