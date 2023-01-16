import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-multistep-modal',
  templateUrl: './multistep-modal.component.html',
})
export class MultistepModalComponent implements OnInit {
  @ContentChildren('step') steps!: QueryList<TemplateRef<void>>;
  modalAlreadySeen: boolean = false;
  currentStep: number = 0;

  ngOnInit() {
    this.modalAlreadySeen = localStorage.getItem('modalAlreadySeen') === 'true';
  }

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

  persistModalClose() {
    localStorage.setItem('modalAlreadySeen', 'true');
  }
}
