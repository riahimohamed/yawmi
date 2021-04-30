import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { YawmiComponent } from './yawmi.component';

import { YawmiService } from './yawmi.service';
import { HostlistinerDirective } from './hostlistiner.directive';
import { ReservDatePipe } from './reserv-date.pipe';

@NgModule({
  declarations: [YawmiComponent, HostlistinerDirective, ReservDatePipe],
  imports: [
  	CommonModule
  ],
  exports: [YawmiComponent],
  providers: [ YawmiService ]
})
export class YawmiModule { }
