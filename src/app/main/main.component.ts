import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  success: boolean;

  response: any;

  // catch the entered input value to submit it to catchSearchString()
  searchString: string;

  // define error boolean status so it can be set to true if there's error in the response from the API, and show alert in DOM
  // and to be set to true after the error is no more exist and remove the alert from DOM
  // using the getCards() function bellow
  error: boolean;

  constructor( private search: SearchService ) { }

  // Submit the entered input value to the API link in search.service.ts to search for it
  catchSearchString() {
    this.search.setString(this.searchString);
  }

  ngOnInit() {
  }

  // handle the response from the API that come from the search.service and render it as cards in DOM
  getCards() {

    this.search.getData().subscribe(
      next => {

        // to bind data in {{HTML}}
        this.response = next.results; 

        // to show the HTML of cards when respons done properly
        this.success = true;

      },
      error => {
        // set the error status true so it render the html error with *ngIf directive
        this.error = true;
      },
      () => {

        // reset the error to false after rendering the data from the API successfuly
        this.error = false;

        // reset input data-bind after cards rendered
        this.search.setString(undefined);

        // reset input value after cards rendered
        $('#search-input').val('');
        
      }
    )
  }

}
