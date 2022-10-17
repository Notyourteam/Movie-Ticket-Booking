import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNo'
})
export class PhoneNoPipe implements PipeTransform {

  transform(rawNum:string) {
    rawNum = '+91-'+rawNum
    return rawNum
  }

}
