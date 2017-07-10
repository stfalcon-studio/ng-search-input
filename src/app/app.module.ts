import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JsonpModule } from '@angular/http';
import { NgSearchInputModule } from "app/ng-search-input/ng-search-input.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    NgSearchInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
