import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 weekDayVal: string;
 timingVal: string;
 reserve: any = [];
 timeTable: any = { 
 					"1": ['9:00', '18:30'],
			 		"2": ['9:00', '18:30'],
			 		"3": ['10:00', '12:30'],
			 		"4": ['8:30', '17:30'],
			 		"5": ['8:30', '17:00'],
			 		"6": ['7:30', '17:30'],
			 		"0": ['8:30', '17:00'],
			 	};

today: any = new Date()

 constructor(){}

 ngOnInit(){
 	this.reserve = [this.today, '2021-04-20'];

 }

 getWeekDay(item: string){
 	this.weekDayVal = item;
 }

 getTime(item: string){
 	this.timingVal = item;
 }

}
