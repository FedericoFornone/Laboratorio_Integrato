import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {

  team = [
    {
      name: 'Federico Fornone',
      role: 'Team Leader, Backend Developer',
      image: './././assets/about/team/riccardorapizzi.webp' /* FIXME: */,
    },
    {
      name: 'Alessia Rizzo',
      role: 'Backend Developer',
      image: './././assets/about/team/alessiarizzo.webp',
    },
    {
      name: 'Daniele Budano',
      role: 'Backend Developer',
      image: './././assets/about/team/danielebudano.webp',
    },
    {
      name: 'Riccardo Rapizzi',
      role: 'Fintech Developer',
      image: './././assets/about/team/riccardorapizzi.webp',
    },
    {
      name: 'Luca Mainardi',
      role: 'Fintech Developer',
      image: './././assets/about/team/lucamainardi.webp',
    },
    {
      name: 'Jacopo Trompeo',
      role: 'Web Developer',
      image: './././assets/about/team/jacopotrompeo.webp',
    },
    {
      name: 'Luna Diatto',
      role: 'Web Developer',
      image: './././assets/about/team/lunadiatto.webp',
    },
    {
      name: 'Michele Aliverti',
      role: 'Web Developer',
      image: './././assets/about/team/michelealiverti.webp',
    },
  ];
}
