import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSearchInputComponent } from './ng-search-input/ng-search-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgSearchInputComponent],
  exports: [NgSearchInputComponent]
})
export class NgSearchInputModule { }
