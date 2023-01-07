import { Component, Input, TemplateRef, ContentChildren, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'app-responsive-slider',
  templateUrl: './responsive-slider.component.html',
})
export class ResponsiveSliderComponent {
  @ContentChildren('slide') slides!: QueryList<TemplateRef<any>>;
  @Input() currentSlideIndex: number = 0;
  singleSlide = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth < 1024) {
      this.singleSlide = true;
    } else {
      this.singleSlide = false;
    }
  }
}
