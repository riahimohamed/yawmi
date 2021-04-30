# Yawmi Responsive

> `This library was generated with Angular`

## what is this!

Scheduler Calendar library for all applications that contain to book appointments in medical clinics, party or sports halls etc...

Appointment schedulers are business tools that allow clients choose an available date and time.

`Image Scheduler Calendar`

![alt text](https://github.com/riahimohamed/yawmi/tree/main/projects/yawmitest/src/assets/Appointement.jpg?raw=true)

`Image Scheduler Calendar Reserved`

![alt text](https://github.com/riahimohamed/yawmi/tree/main/projects/yawmitest/src/assets/Reserved.jpg?raw=true)


## Installation

1. npm i yawmi --save
2. npm i moment --save

## Importing...

```

Add to your app.module:

 import { YawmiModule } from 'yawmi';

And

 imports: [, YawmiModule, ...], ...

```

Then ...

## How it Works

This Library contain @Input() and @Output() parameters

| Type | Name | Discription |
| ---- | ---- | ---
| @Input string | lang | The language of Calendar (fr, en, ...) |
| @Input numbe | pas | Steps of the timing with (30`min`, 1`hour` or 20`min`) |
| @Input string | msg | Message of date reserved ! |
| @Input any[] | appointed | Tabe contain all days reserved (date 'YYYY-MMM-DDDD')|
| @Input any{} | schedule | TimeTable conatin all timing for each day `from when to ...` |
| @Output | weekDayEvent | Give date of day you choose it :muscle: |
| @Output | timingEvent | Give time you choose it :muscle: |

## Methods and Variables in app.component.ts

```
/* Variable get day value from getWeekDay(...) method */
weekDayVal: string; 

/* Variable get timing value from getTime(...) method */
timingVal: string; 

/* Push all date reserved here to this table */
reserve: any = []; 

for example :

reserve.push('2021-04-30') or

reserve.push(moment()) or

reserve.push(new Date())

/* 

TimeTable form 0 to 6 (Sunday to Saturday) 
each day can get horaire and must fill up manual like this or

push exp to Sunday (0) : `timeTable[0] = "0": ['8:30', '17:00']`

 */
timeTable: any = { 
                "1": ['8:00', '18:30'],
                "2": ['9:00', '18:30'],
                "3": ['10:00', '12:30'],
                "4": ['8:30', '17:30'],
                "5": ['8:30', '17:00'],
                "6": ['7:30', '17:30'],
                "0": ['8:30', '17:00'],
            };

```

## Add this lines to your app.component.ts

```
export class AppComponent implements OnInit{

 weekDayVal: string;
 timingVal: string;
 reserve: any = [];
 timeTable: any = { 
 					"1": ['9:00', '18:30'],,
			 		"2": ['9:00', '18:30'],
			 		"3": ['10:00', '12:30'],
			 		"4": ['8:30', '17:30'],
			 		"5": ['8:30', '17:00'],
			 		"6": ['7:30', '17:30'],
			 		"0": ['8:30', '17:00'],
			 	};

today: any = new Date();

 constructor(){}

 ngOnInit(){

 	this.reserve = [this.today, '2021-04-10'];

 }

 /* Method for get day value */
 getWeekDay(item: string){
 	this.weekDayVal = item;
 }

 /* Method for get time value */
 getTime(item: string){
 	this.timingVal = item;
 }

}

```

## App.component.html

```
<yawmi-calendar 
	[lang]="'fr'"
	[pas]= 1
	[schedule]= "timeTable"
	[appointed]="reserve"
	[msg]="'Aucun créneau n\'est disponible'"
	(weekDayEvent)="getWeekDay($event)" 
	(getTime)="getWeekDay($event)">
</yawmi-calendar>

```

## Good day and thanks 