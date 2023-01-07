import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class StatsComponent implements OnInit {
  lineChartConfig: any;
  currentSlide: number = 0;
  windowSize!: number;

  // @ViewChild("carousel") carousel!: any;

  constructor(private route: ActivatedRoute) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowSize = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const { stats, windowSize } = data;
      this.windowSize = windowSize;
    });
  }

  /*previousSlide() {
    if (this.currentSlide === 0) {
      return;
    }
    this.currentSlide--;

    this.animateCarousel();
  }

  nextSlide() {
    const totalSlides = this.carousel.nativeElement.childNodes.length;

    if (this.currentSlide === totalSlides) {
      return;
    }
    this.currentSlide++;

    this.animateCarousel();
  }

  animateCarousel() {
    const carousel = this.carousel.nativeElement;
    carousel.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }*/
}
