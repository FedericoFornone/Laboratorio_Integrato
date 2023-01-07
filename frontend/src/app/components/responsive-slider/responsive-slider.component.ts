import { Component, Input, TemplateRef, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-responsive-slider',
  templateUrl: './responsive-slider.component.html',
})
export class ResponsiveSliderComponent {
  @ContentChildren('slide') slides!: QueryList<TemplateRef<any>>;
  @Input() currentSlideIndex: number = 0;
}
