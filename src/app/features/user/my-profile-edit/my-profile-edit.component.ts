import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../../../shared/entities';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-profile-edit.component.html',
  styleUrl: './my-profile-edit.component.css'
})
export class MyProfileEditComponent implements OnInit {

  //On définis nos variables
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
      email: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
    })
  };

  //On charge les données du user connecté pour pré-remplir le formulaire
  loadUser(): void {
    this.userService.getUserById().subscribe(data => {
      this.myProfileEditForm.patchValue({
        name: data.name,
        firstname: data.firstname,
        email: data.email,
        adress: data.adress,
        gender: data.gender,
        birthdate: data.birthdate,
      })
    });
  };

  //Méthode appelée lors de la soumission du formulaire
  onSubmit() {
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

}
