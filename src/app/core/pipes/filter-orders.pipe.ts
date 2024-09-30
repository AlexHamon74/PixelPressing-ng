import { Pipe, PipeTransform } from '@angular/core';
import { commandInterface } from '../../shared/entities';

@Pipe({
  name: 'filterOrders',
  standalone: true
})
export class FilterOrdersPipe implements PipeTransform {

  transform(orders: commandInterface[], searchText: string): commandInterface[] {
    if (!orders || !searchText) {
      return orders;
    }
    return orders.filter(order =>
      order.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      order.user.firstname.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
