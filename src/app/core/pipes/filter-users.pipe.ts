import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../../shared/entities';

@Pipe({
  name: 'filterUsers',
  standalone: true
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: UserInterface[], searchText: string): UserInterface[] {
    if (!users || !searchText) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
