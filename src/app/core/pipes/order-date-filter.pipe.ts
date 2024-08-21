import { Pipe, PipeTransform } from '@angular/core';
import { orderInterface } from '../../shared/entities';

@Pipe({
  name: 'orderDateFilter',
  standalone: true
})
export class OrderDateFilterPipe implements PipeTransform {

  transform(orders: orderInterface[], searchDate: string): orderInterface[] {
    if (!orders || !searchDate) {
      return orders;
    }

    // Extraire la date au format "YYYY-MM-DD" depuis searchDate
    const [year, month, day] = searchDate.split('-');
    const searchFormattedDate = `${day}/${month}/${year}`;

    return orders.filter(order => {
      // Comparer directement la date créée avec la date formatée
      return order.createdAt === searchFormattedDate;
    });
  }
}

