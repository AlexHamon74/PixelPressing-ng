import { Component, Input } from '@angular/core';
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

  constructor(private itemService: ItemService) {}

  closeModal() {
    this.currentItem = null;
  }

  deleteItem() {
    if (this.currentItem) {
      this.itemService.deleteItem(this.currentItem.id).subscribe(() => {
        // Après la suppression réussie, fermer le modal
        this.closeModal();
      });
    }
  }
}