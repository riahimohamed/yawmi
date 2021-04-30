import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { YawmiModule } from 'yawmi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YawmiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
