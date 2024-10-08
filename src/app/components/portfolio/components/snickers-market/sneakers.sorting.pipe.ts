import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
 transform(array: Array<any>, field: string): Array<any> {
   array.sort((a: any, b: any) => {
     if (a[field] < b[field]) {
       return -1;
     } else if (a[field] > b[field]) {
       return 1;
     } else {
       return 0;
     }
   });
   return array;
 }
}