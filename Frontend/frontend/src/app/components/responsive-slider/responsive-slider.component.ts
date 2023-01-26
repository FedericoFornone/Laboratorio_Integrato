import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-responsive-slider',
  templateUrl: './responsive-slider.component.html',
})
export class ResponsiveSliderComponent {
  @Input() hasMain: boolean = false;
  @ContentChildren('slide') slides!: QueryList<TemplateRef<void>>;
  currentSlide: number = 0;

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    }
  }
}
