import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  test() {
    if (Math.random() < 5) {
      return 'a';
    }
    return 0;
  }
}
