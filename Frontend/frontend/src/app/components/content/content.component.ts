import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent {
  @Input() content : string = '';
}
