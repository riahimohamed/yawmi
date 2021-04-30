import { Injectable } from '@angular/core';

import * as moment_ from 'moment';
const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class YawmiService {

  Cellstime: any = [];
  cells: any = [];

  constructor() { }an

  setTiming(pas, timing, endTiming){

 	this.Cellstime = [];
 	endTiming.add(1, 'hours');

 	while(!(timing.isSameOrAfter(endTiming, 'hours')) ){

		this.Cellstime.push({
			time: timing.format('HH:mm'),
		});

		if(pas !== 1){
			timing.add(pas, 'minutes');
		}else{
			timing.add(pas, 'hours');
		}
	}

	return this.Cellstime;
  }

  setDays(currentDate, appointed){

	 	this.cells = [];

	 	let startWeek = moment(currentDate);
		let endWeek =  moment(currentDate).add(6, 'days');

	 	do{
			this.cells.push({
				date: moment(startWeek)
			});
			startWeek.add(1, 'days');

		} while(startWeek.isSameOrBefore(endWeek));

		return this.cells;
	 }

	 appointment(currentDate, appoint){
		
		let endWeek =  moment(currentDate).add(6, 'days');

		return appoint.filter(item => {
			return moment(currentDate).isSameOrBefore(item, 'day') && 
			   	   moment(item).isBetween(moment(currentDate).subtract(1, 'day'), 
			   	   						  endWeek.add(1, 'day'), 'day')
		});
	}

	validToDay(currentDate, schedule): boolean{

		let current = schedule[currentDate.day()];

		if(current){
			let close = {
				"hour": current[1].slice(0, current[1].indexOf(':')),
				"minute": current[1].slice(current[1].indexOf(':') + 1)
			}

			return !currentDate.isSameOrBefore(moment(close), 'hour');
		}

		return false;
	}
}
