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

        // clear the inner html of the div so if the user re-entered 'people' in the input field,
        // the cards don't get repeated and only rendered once.
        $('.cards .row').html("");

        // loop in the response array and render the cards in DOM.
        // using inline-css so it applies when the response come true,
        // it won't apply if the style where in external css file
        for (let i = 0; i < next.results.length; i++) {
          $('.cards .row').append(`<div class="col-lg-4 draggable">
            <div class="thumbnail" style="box-shadow: 0px 5px 9px 1px #ddd;padding:0;margin-bottom:30px">
              <div class="caption" style="padding:0;background:#fff;">
                <h3 style="font-size: 16px;
                padding: 20px;
                margin: 0 0 20px 0;
                background: #f0f1f2;
                border: 1px solid #f0f1f2;"><strong>Name:</strong> ${next.results[i].name}</h3>
                <p style="font-size:14px;padding: 0px 20px 20px;margin: 0;"><strong>Homeworld:</strong> ${next.results[i].homeworld}</p>
                <p style="font-size:14px;padding: 0px 20px 20px;margin: 0;"><strong>Height:</strong> ${next.results[i].height}</p>
                <p style="font-size:14px;padding: 0px 20px 20px;margin: 0;"><strong>URL:</strong> ${next.results[i].url}</p>
              </div>
            </div>
          </div>`);
        }

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

        // make cards draggable and droppable anywhere in screen
        $('.draggable').draggable();

        // reset input value after cards rendered
        $('#search-input').val('');
      }
    )
  }

}
