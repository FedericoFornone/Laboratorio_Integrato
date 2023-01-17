import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
})
export class StatsComponent implements OnInit {
  tutorialModalOpen = false;
  provincesData = [
    {
      name: 'Abruzzo',
      imageName: 'abruzzo.jpg',
    },
    {
      name: "L'Aquila",
      imageName: 'aquila.jpg',
    },
    {
      name: 'Teramo',
      imageName: 'teramo.jpg',
    },
    {
      name: 'Pescara',
      imageName: 'pescara.jpg',
    },
    {
      name: 'Chieti',
      imageName: 'chieti.jpg',
    },
  ];

  ngOnInit(): void {
    this.tutorialModalOpen =
      localStorage.getItem('dashboardModalSeen') !== 'true';
  }

  closeModal() {
    this.tutorialModalOpen = false;
    localStorage.setItem('dashboardModalSeen', 'true');
  }

  openModal() {
    this.tutorialModalOpen = true;
  }
}
