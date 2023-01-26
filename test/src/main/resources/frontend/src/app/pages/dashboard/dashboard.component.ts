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

  /* this ensures that the tutorial is only displayed by default if 
  the user has never seen it yet */
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

  /* while we're saving the stats filters in local storage, we 
  also decided to reset them when a different region is selected, 
  as it wouldn't make sense to keep the same filters for different
  graphs */
  resetFilters() {
    localStorage.removeItem('statisticsFilters');
    localStorage.removeItem('predictionsFilters');
  }
}
