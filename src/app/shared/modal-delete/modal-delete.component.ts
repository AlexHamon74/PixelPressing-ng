import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { itemsInterface, serviceInterface, UserInterface } from '../entities';
import { ItemService } from '../../core/services/item.service';
import { ServiceService } from '../../core/services/service.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  @Input() currentItem: itemsInterface | null = null;
  @Input() currentService: serviceInterface | null = null;
  @Input() currentUser: UserInterface | null = null;
  @Output() objectDeleted = new EventEmitter<void>();

  itemService = inject(ItemService);
  serviceService = inject(ServiceService);
  userService = inject(UserService);

  //Fonction pour fermer le modal
  closeModal() {
    const modalElement = document.getElementById('modalDelete');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

  // Fonction pour supprimer l'élément actuel
  deleteObject() {
    if (this.currentItem) {
      this.itemService.deleteItem(this.currentItem.id).subscribe(() => {
        this.objectDeleted.emit();
      });
    } else if (this.currentService) {
      this.serviceService.deleteService(this.currentService.id).subscribe(() => {
        this.objectDeleted.emit();
      });
    }
  }
}