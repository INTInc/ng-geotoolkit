import {BaseWidget} from '@int/geotoolkit/widgets/BaseWidget';
import {AbstractGauge} from '@int/geotoolkit/gauges/AbstractGauge';
import {Axis} from '@int/geotoolkit/gauges/axis/Axis';
import {Range} from '@int/geotoolkit/util/Range';

export class GaugeWidget extends BaseWidget {
  private _gauge: AbstractGauge;

  constructor(props?: object) {
    super(props);
    if (props && props.hasOwnProperty('gauge')) {
      this.addGauge(props['gauge']);
    }
  }

  public dispose() {
    this.removeChild(this._gauge);
    this._gauge.dispose();
    super.dispose();
  }

  public get gauge(): AbstractGauge {
    return this._gauge;
  }

  public set gauge(gauge: AbstractGauge) {
    this.addGauge(gauge);
  }

  public fitToBounds(): void {
    this._gauge.setBounds(this.getModelLimits().clone());
  }

  private addGauge(gauge: AbstractGauge) {
    this.removeChild(this._gauge);
    this._gauge = gauge;
    this.insertChild(0, gauge);
    this.fitToBounds();
  }
}

export interface IAxisGauge {
  getAxis(name: string | number): Axis;
}

export interface IValueGauge {
  setValue(val: number, skipAnimation?: boolean): AbstractGauge;
}

export interface IRangeGauge {
  setRange(range: Range | { max: number, min: number }): AbstractGauge;
}

export function isIAxisGauge(gauge: any): gauge is IAxisGauge {
  return gauge && typeof (gauge).getAxis === 'function';
}

export function isIValueGauge(gauge: any): gauge is IValueGauge {
  return gauge && typeof (gauge).setValue === 'function';
}

export function isIRangeGauge(gauge: any): gauge is IRangeGauge {
  return gauge && typeof (gauge).setRange === 'function';
}
