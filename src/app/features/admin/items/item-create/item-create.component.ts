import { Component, inject, OnInit, runInInjectionContext } from '@angular/core';
import { SideNavAdminComponent } from '../../../../shared/side-nav-admin/side-nav-admin.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../../../core/services/item.service';
import { Router } from '@angular/router';
import { itemsInterface } from '../../../../shared/entities';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [SideNavAdminComponent, ReactiveFormsModule],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})
export class ItemCreateComponent implements OnInit{
  createItemForm!: FormGroup;
  itemService = inject(ItemService);
  router = inject(Router);


  ngOnInit() {
    this.createItemForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        image: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.itemService.createItem(this.createItemForm.value).subscribe({
      next: () => {
        // Redirection après la création (optionnel)
        this.router.navigate(['/item-list']);
      },
    });
  }
}
