import {
  Component,
  TemplateRef,
  ContentChildren,
  QueryList,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-responsive-slider',
  templateUrl: './responsive-slider.component.html',
})
export class ResponsiveSliderComponent {
  @ContentChildren('slide') slides!: QueryList<TemplateRef<any>>;
  @Input() singleSlide!: boolean;
  currentSlideIndex: number = 0;

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    }
  }

  nextSlide() {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    }
  }
}
