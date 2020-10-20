import { Component } from '@angular/core';

@Component({
  selector: 'tutorials-description',
  template: '<div class="tutorials-description"><ng-content></ng-content></div>',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {

  constructor() { }

}
