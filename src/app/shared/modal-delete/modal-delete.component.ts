import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { itemsInterface } from '../entities';
import { ItemService } from '../../core/services/item.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  @Input() currentItem: itemsInterface | null = null;
  @Output() itemDeleted = new EventEmitter<void>();

  itemService = inject(ItemService);

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

  //Fonction pour supprimer l'élément actuel
  deleteItem() {
    if (this.currentItem) {
      this.itemService.deleteItem(this.currentItem.id).subscribe(() => {
        this.itemDeleted.emit();
      });
    }
  }
}