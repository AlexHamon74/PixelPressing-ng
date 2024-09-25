import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { serviceInterface } from '../../../../shared/entities';
import { ServiceService } from '../../../../core/services/service.service';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { NgFor } from '@angular/common';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [RouterLink, SideNavAdminComponent, NgFor, ModalDeleteComponent],
  templateUrl: './service-list.component.html',
  styleUrl: '../../admin-style.css'
})
export class ServiceListComponent implements OnInit{

  //On déclare les varibales
  services:serviceInterface[] = [];
  currentService: serviceInterface | null = null;

  //On injecte les services
  serviceService = inject(ServiceService);

  @ViewChild(ModalDeleteComponent) modalDeleteComponent!: ModalDeleteComponent;

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

  //Fonction pour définir l'élément actuel à supprimer
  confirmDelete(service: serviceInterface) {
    this.currentService = service;
  }

  //Fonction pour supprimer l'élément actuel
  onServiceDeleted() {
    this.getServices();
    this.modalDeleteComponent.closeModal();
  }


}
