import { Component, OnInit, ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/onErrorResumeNext';
import 'rxjs/add/operator/switchMap';
import { Subscription } from "rxjs/Subscription";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-search-input',
  templateUrl: './ng-search-input.component.html',
  styleUrls: ['./ng-search-input.component.css']
})
export class NgSearchInputComponent implements OnInit, OnDestroy {
  @Input() value: string;
  @Input() searchCallback: Function;
  @Input() minLength = 3; // min length for search
  @Input() needSearchOnFocus = true;
  @Input() needSearchOnFocusEmptyText = false;
  @Input() placeholder: string;
  @Input() timeout = 300;

  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() input: EventEmitter<any> = new EventEmitter();
  @Output() setResult: EventEmitter<any> = new EventEmitter();

  private subscription: Subscription;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    let textBefore = null;
    const input = this.el.nativeElement.querySelector('input');

    this.subscription =
      Observable
        .merge(
        Observable.fromEvent(input, 'input'),
        Observable.fromEvent(input, 'propertychange'),
        Observable.fromEvent(input, 'focus')
        )
        .filter((e: any) => {
          return e.type !== 'focus' || this.needSearchOnFocus;
        })
        .map((e) => e.type !== 'focus' || !this.needSearchOnFocusEmptyText ? e.target.value : '')
        .filter((text) => {
          const result = (this.minLength === 0 &&
            (text !== textBefore || this.needSearchOnFocus)) ||
            (text && (text !== textBefore && this.minLength ? this.minLength <= text.length : true))
          ;
          return result;
        })
        .map(text => textBefore = text)
        .debounceTime(this.timeout)
        .switchMap(
        text => {
          const result = this.searchCallback(text)
          .onErrorResumeNext(Observable.of(false))
          .filter(data => data)

          return result
        })
        .subscribe(
        (result) => {
          this.setResult.emit({ result });
        },
        (error) => {
          this.setResult.emit({ error });
        }
        )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
