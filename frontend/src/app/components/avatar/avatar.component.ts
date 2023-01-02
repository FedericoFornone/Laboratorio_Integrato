import { Component, Input } from '@angular/core';

@Component({
  // [] notation makes the inputs required
  selector: 'app-avatar[name][role][image]',
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() name!: string;
  @Input() role!: string;
  @Input() image!: string;
}
