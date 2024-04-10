import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.firstName.toLowerCase().includes(searchText) ||
        it.lastName.toLowerCase().includes(searchText) ||
        it.idCard.toLowerCase().includes(searchText) ||
        it.startDate.toLowerCase().includes(searchText);
    });
  }
}

