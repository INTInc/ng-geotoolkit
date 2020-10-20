import { Component } from '@angular/core';

@Component({
  selector: 'app-gauges',
  templateUrl: './gauges.component.html'
})
export class DemoGaugesComponent {
  private _gaugeValue = 0;
  private _gaugeType = 'ThreeBandCircular';

  private getRandomValue(number: number) {
    return Math.random() * number;
  }

  constructor () {
    this._gaugeValue = this.getRandomValue(60);
  }

  get gaugeValue () {
    return this._gaugeValue;
  }

  get gaugeType () {
    return this._gaugeType;
  }

  get gaugeRange () {
    return {'min': 0, 'max': 60};
  }

  onGaugeValueUpdate () {
    this._gaugeValue = this.getRandomValue(60);
  }

  onTypeChanged (type: string) {
    this._gaugeType = type;
    this._gaugeValue = this.getRandomValue(60);
  }
}
