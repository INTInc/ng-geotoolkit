import { Component, Input } from '@angular/core';

@Component({
  selector: 'tutorials-sample',
  template: '<div class="tutorials-sample-component"><ng-content></ng-content></div>',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent {

  constructor() { }

}
