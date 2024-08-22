import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../../shared/entities';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-my-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './my-profile-edit.component.html',
  styleUrl: './my-profile-edit.component.css'
})
export class MyProfileEditComponent implements OnInit {

  //On définis nos variables
  isSubmitted = false
  myProfileEditForm!: FormGroup;
  user: UserInterface = {} as UserInterface;

  //On injectes nos services
  userService = inject(UserService);
  router = inject(Router);

  //Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.getUser();
    this.initializeForm();
    this.loadUser();
  };

  //On récupère les infos du user connecté
  getUser() {
    this.userService.getUserById().subscribe(data => {
      this.user = data;
    })
  };

  //On initialize le formulaire
  initializeForm() {
    this.myProfileEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      adress: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
    })
  };

  //Fonction pour convertir une date du format DD/MM/YYYY en YYYY-MM-DD
  convertDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  //On charge les données du user connecté pour pré-remplir le formulaire
  loadUser(): void {
    this.userService.getUserById().subscribe(data => {
      //Conversion du format de la date
      const birthdate = this.convertDate(data.birthdate);
      this.myProfileEditForm.patchValue({
        name: data.name,
        firstname: data.firstname,
        email: data.email,
        adress: data.adress,
        gender: data.gender,
        birthdate: birthdate,
      })
    });
  };

  //Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.isSubmitted = true;

    if (this.myProfileEditForm.valid) {
      const updatedUser: UserInterface = {
        ...this.user,
        ...this.myProfileEditForm.value
      };
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.router.navigate(['/myProfile']);
      });
    }
  }

  //Méthode pour vérifier si les champs ont une erreur spécifique
  public hasError(controlName: string, errorName: string) {
    return this.myProfileEditForm.controls[controlName].hasError(errorName);
  };

}
