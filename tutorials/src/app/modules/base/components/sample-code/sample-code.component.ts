import { Component, Input } from '@angular/core';

export enum Navigation {
  TSCode = 'TypeScript',
  Template = 'HTML'
}

@Component({
  selector: 'tutorials-sample-code',
  templateUrl: './sample-code.component.html',
  styleUrls: ['./sample-code.component.css']
})
export class SampleCodeComponent {
  private _currentNavigation = Navigation.Template;

  @Input()
  templateCode = '';

  @Input()
  tsCode = '';

  @Input()
  set code(value: string) {
    this.templateCode = value;
  }

  readonly navigation = Object.values(Navigation);

  set currentNavigation(value: Navigation) {
    this._currentNavigation = value;
  }

  get currentNavigation(): Navigation {
    return this._currentNavigation;
  }

  get currentCode(): string {
    switch (this._currentNavigation) {
      case Navigation.Template:
        return this.templateCode;
      case Navigation.TSCode:
        return this.tsCode;
      default:
        return this.templateCode;
    }
  }
}


