import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  QueryList,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit, AfterViewInit {
  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  currentSlide: number = 0;
  numberOfSlides!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {});
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.numberOfSlides = this.slides.length;
    }, 0);
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
