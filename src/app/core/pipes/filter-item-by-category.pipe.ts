import { Pipe, PipeTransform } from '@angular/core';
import { itemsInterface } from '../../shared/entities';

@Pipe({
  name: 'filterItemByCategory',
  standalone: true
})
export class FilterItemByCategoryPipe implements PipeTransform {

  transform(items: itemsInterface[], categoryName: string | null): itemsInterface[] {
    if (!items) {
      return [];
    }
    if (categoryName === 'all' || !categoryName) {
      return items;
    }
    return items.filter(item => item.category.name === categoryName);
  }

}
