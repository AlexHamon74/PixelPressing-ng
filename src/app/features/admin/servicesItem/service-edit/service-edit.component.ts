import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { ServiceService } from '../../../../core/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { serviceInterface } from '../../../../shared/entities';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-service-edit',
  standalone: true,
  imports: [ReactiveFormsModule, SideNavAdminComponent, NgIf],
  templateUrl: './service-edit.component.html',
  styleUrl: '../../admin-style.css'
})
export class ServiceEditComponent implements OnInit {

  //On déclare les variables
  editServiceForm!: FormGroup;
  serviceId: any;
  isSubmitted = false;

  //On inject les services
  serviceService = inject(ServiceService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  //Methode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.serviceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
    this.loadService();
  };

  //On initialize le formulaire
  initializeForm(): void {
    this.editServiceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern(/\d/)]),
    });
  };

  //On charge les données d'un article spécifique pour pré-remplir le formulaire de modification
  loadService(): void {
    this.serviceService.getServiceById(this.serviceId!).subscribe(service => {
      this.editServiceForm.patchValue({
        name: service.name,
        description: service.description,
        image: service.image,
        price: service.price
      });
    });
  };

  //Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    this.isSubmitted = true;
    if (this.editServiceForm.valid) {
      const updateService: serviceInterface = this.editServiceForm.value;
      updateService.id = this.serviceId!;
      this.serviceService.editService(updateService).subscribe(() => {
        this.router.navigate(['/admin/service-list'])
      });
    };
  };

  //Méthode pour vérifier si les champs ont une erreur spécifique
  public hasError(controlName: string, errorName: string) {
    return this.editServiceForm.controls[controlName].hasError(errorName);
  };

}
