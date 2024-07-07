import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../core/services/service.service';
import { Router } from '@angular/router';
import { SideNavAdminComponent } from "../../../../shared/side-nav-admin/side-nav-admin.component";

@Component({
    selector: 'app-service-create',
    standalone: true,
    templateUrl: './service-create.component.html',
    styleUrl: '../../admin-style.css',
    imports: [ReactiveFormsModule, SideNavAdminComponent]
})
export class ServiceCreateComponent implements OnInit{

  //On déclare les variable
  createServiceForm!:FormGroup;

  //On injecte les services
  serviceService = inject(ServiceService);
  router = inject(Router);

  //Methode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.initializeForm();
  };

  //On initialise le formulaire
  initializeForm(){
    this.createServiceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl ('', [Validators.required]),
    });
  };

  //Fonction appelée lors de la soumission du formulaire
  onSubmit(){
    this.serviceService.createService(this.createServiceForm.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/service-list']);
      }
    });
  };

}
