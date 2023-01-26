import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-multistep-modal',
  templateUrl: './multistep-modal.component.html',
})
export class MultistepModalComponent {
  @ContentChildren('step') steps!: QueryList<TemplateRef<void>>;
  @Input('modalOpen') modalOpen!: boolean;
  @Output() closeModal = new EventEmitter<boolean>();
  currentStep: number = 0;

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  emitCloseModal() {
    this.closeModal.emit(false);
  }
}
