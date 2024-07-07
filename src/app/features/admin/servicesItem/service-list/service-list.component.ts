import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { serviceInterface } from '../../../../shared/entities';
import { ServiceService } from '../../../../core/services/service.service';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [RouterLink, SideNavAdminComponent, NgFor],
  templateUrl: './service-list.component.html',
  styleUrl: '../../admin-style.css'
})
export class ServiceListComponent implements OnInit{

  //On déclare les varibales
  services:serviceInterface[] = [];

  //On injecte les services
  serviceService = inject(ServiceService);

  //Methode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getServices();
  };

  //On récupère tous les services
  getServices(){
    this.serviceService.fetchAll().subscribe(service => {
      this.services = service;
    });
  };


}
