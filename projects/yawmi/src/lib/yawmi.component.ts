import { Component, OnInit, Input, Output,
		 EventEmitter, ViewChild, ElementRef,
		 AfterViewInit, ViewEncapsulation, SimpleChanges } from '@angular/core';

import { YawmiService } from './yawmi.service';

import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'yawmi-calendar',
  templateUrl: './yawmi.component.html',
  styleUrls: ['./yawmi.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class YawmiComponent implements OnInit, AfterViewInit {
  	
  	@ViewChild("daySlot") daySlot: ElementRef;
  	@ViewChild("timeSlot") timeSlot: ElementRef;

  	@Input() msg: string = 'the date is reserved';
 	@Input() lang: string = 'fr';
 	@Input() pas: any = 30;
 	@Input() appointed: any = [];

 	@Input() schedule: any = { 
		 					"1": ['8:30', '17:30'],
					 		"2": ['8:30', '17:30'],
					 		"3": ['8:30', '17:30'],
					 		"4": ['8:30', '17:30'],
					 		"5": ['8:30', '17:30'],
					 		"6": ['8:30', '17:30'],
					 		"0": ['8:30', '17:30'],
					 	};
 	
 	@Output() weekDayEvent = new EventEmitter<string>();
 	@Output() timingEvent = new EventEmitter<string>();

	currentDate = moment();

	month: string;
	timing = moment();
	endTiming = moment();

	cells = [];
	Cellstime = [];

	weekDayVal: any = '';
	timingVal: any = '';

	interval = [30, 20, 1];
	disable: boolean = false;

	appointedFilter: any = [];
	resrvFilter = '';

	constructor(private service: YawmiService){}

	 setSchedule(schedule){

	 	let open = {
			"hours": schedule[0].slice(0, schedule[0].indexOf(':')),
			"minutes": schedule[0].slice(schedule[0].indexOf(':') + 1)
		}

		let close = {
			"hours": schedule[1].slice(0, schedule[1].indexOf(':')),
			"minutes": schedule[1].slice(schedule[1].indexOf(':') + 1)
		}

		let diff = this.getDiff(open, close);

	 	if(!diff){
	 		open = {'hours':'8', 'minutes':'00'};
	 		close = {'hours':'17', 'minutes':'00'};
	 	}

	 	this.timing.set({ 'hour': parseInt(open.hours), 'minute': parseInt(open.minutes) });
	 	this.endTiming.set({ 'hour': parseInt(close.hours), 'minute': parseInt(close.minutes) });

	 	this.Cellstime = this.service.setTiming(this.pas, this.timing, this.endTiming);
	 }

	 getDiff(open, close): boolean{

	 	return (open.hours <= 24 && close.hours <= 24) && 
	 					   (open.minutes <= 55 && close.minutes <= 55) &&
	 					   (moment(close.hours, 'HH:mm').diff(moment(open.hours, 'HH:mm'), 'hour') >= 0);
	 }

	 ngOnInit(){

	 	this.currentDate.locale(this.lang);
		moment.locale(this.lang);

		if(this.service.validToDay(this.currentDate, this.schedule)){
			this.currentDate.add(1, 'days')
		}

	 	this.month = moment().format("MMMM YYYY") ;

	 	this.cells = this.service.setDays(this.currentDate, this.appointed);
	 	this.appointedFilter = this.service.appointment(this.currentDate, this.appointed);
	 }

	 ngAfterViewInit(){	
	 	this.disableArrow();
	 }

	 ngOnChanges(changes: SimpleChanges){
		
		if(!this.interval.includes(changes.pas.currentValue)){
			this.pas = 30;
		}

		if(this.msg) {
		    this.msg = changes.msg.currentValue;
		  }
	 }

	prevButton(){
		
		setTimeout(() => {
			if(!this.disable){
				this.currentDate.subtract(1, 'weeks');
				this.paramDay();
			}
		});
	}

	nextButton(){

		setTimeout(() => {
			this.currentDate.add(1, 'weeks');
			this.paramDay();
		})
	}

	disableArrow(){
		setTimeout(() => {
	 		this.disable = this.cells[0].date.isSameOrBefore(moment());
	 	}, 0)
	}

	resetTimeSlot(){
		let selectedDOM = this.timeSlot.nativeElement.querySelector('.selected');

		if(selectedDOM) {
	      selectedDOM.classList.remove('selected');
	    }

	    this.weekDayVal = '';

	    this.timingVal = '';
	}

	paramDay(){
		this.cells = this.service.setDays(this.currentDate, this.appointed);

		this.disableArrow()
		this.resetTimeSlot();
	}

	selectElDateVal(index){
		this.setWeekDay(this.cells[index].date);
		this.weekDayEvent.emit(this.weekDay);

		let schedule = this.schedule[this.weekDay.day()];

		if(schedule.length !== 0){
			this.setSchedule(schedule);

			let res = this.service.appointment(this.currentDate, this.appointed)
			this.resrvFilter = res.find(val => moment(this.weekDay).isSame(moment(val), 'day'));
		}else{
			this.resrvFilter = 'true';
		}
	}

	selectElTimeVal(index: string){
		this.setTimingVal(this.Cellstime[index].time);
		this.timingEvent.emit(this.time);
	}

	get weekDay(){
		return this.weekDayVal;
	}

	setWeekDay(value){
		this.weekDayVal = value
	}

	get time(){
		return this.timingVal;
	}

	setTimingVal(value){
		this.timingVal = value;
	}
}
