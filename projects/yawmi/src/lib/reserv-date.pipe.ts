import { Pipe, PipeTransform } from '@angular/core';

import * as moment_ from 'moment';
const moment = moment_;

@Pipe({
  name: 'reservDate'
})
export class ReservDatePipe implements PipeTransform {

  transform(appointed: [], value: any): boolean {

  	 return appointed.find(val => moment(value).isSame(moment(val), 'day'));
  }

}
