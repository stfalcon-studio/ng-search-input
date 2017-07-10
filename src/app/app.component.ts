import { Component } from '@angular/core';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list = [];
  searchCallback = (
    text => {
      return this.jsonp.get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${text}&format=json&callback=JSONP_CALLBACK`
      )
        .map(
        r => r.json()
        )
        ;
    }
  );

  constructor(private jsonp: Jsonp) {
  }

  onSetResult(event: any) {
    if (event.result && event.result[1] && event.result[1].map) {
      this.list = event.result[1].map((text, key) => ({ text, url: event.result[3][key] }))
    } else {
      this.list = [];
    }
  }

  onInput(event: any) {
    if (!event.target.value || event.target.value.length < 3) {
      this.list = [];
    }
  }
}
