import { Component } from '@angular/core';

@Component({
  selector: 'tutorials-welllog-introduction',
  templateUrl: './introduction.component.html'
})
export class WelllogIntroductionComponent {

  readonly defaultTemplate = {
    template: {
      type: 'welllog',
      tracks: [
        { name: 'Track # 0', type: 'index' },
        { name: 'Track # 1', type: 'linear', visuals: [{cg_type: 'curve', name: 'CALI'}] },
      ]
    }
  };
}
