import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test-angular';
  searchIncrease(searchHg: number){
    console.log('searchIncrease',searchHg);
  }
  searchDcrease(searchHg: number){
    console.log('searchDcrease',searchHg);
  }

}