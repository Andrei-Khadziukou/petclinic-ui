import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public query = '';
  public activeID: number;

  public items = [
    { id: 0, name: 'hello' },
    { id: 1, name: 'hello world' },
    { id: 2, name: 'world' },
  ];
}
