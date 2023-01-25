import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tutorialModalOpen = false;
  provincesData = [
    {
      name: 'Abruzzo',
      imageName: 'abruzzo.webp',
    },
    {
      name: "L'Aquila",
      imageName: 'aquila.webp',
    },
    {
      name: 'Teramo',
      imageName: 'teramo.webp',
    },
    {
      name: 'Pescara',
      imageName: 'pescara.webp',
    },
    {
      name: 'Chieti',
      imageName: 'chieti.webp',
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
