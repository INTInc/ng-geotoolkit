import { Component } from '@angular/core';

@Component({
  selector: 'tutorials-title',
  template: '<h1><ng-content></ng-content></h1>',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {

  constructor() { }
}
