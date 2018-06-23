import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  searchString;

  constructor( private http: Http ) { }

  // get the entered input value
  public getString() {
    return this.searchString;
  }

  // set the entered input value
  public setString(data) {
    this.searchString = data;
  }

  // Search in API for the entered input value in html, after being catched with searchString variable in main.component.ts
  getData() {
    return this.http.get('https://swapi.co/api/' + this.getString() + '/').map(result => result.json());
  }

}
