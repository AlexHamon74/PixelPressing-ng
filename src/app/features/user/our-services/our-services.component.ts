import { NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { serviceInterface } from '../../../shared/entities';
import { ServiceService } from '../../../core/services/service.service';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent implements OnInit{

  //On définis les variables
  services:serviceInterface[] = [];

  //On injectes nos services
  service = inject(ServiceService);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getServices();
  };

  //Méthode pour récupéré tous les services
  getServices(){
    this.service.fetchAll().subscribe(data => {
      this.services = data;
    })
  };


}
