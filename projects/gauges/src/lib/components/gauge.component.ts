import {Range} from '@int/geotoolkit/util/Range';
import {GaugeWidget, isIAxisGauge, isIRangeGauge, isIValueGauge} from './gaugewidget';
import {GaugeRegistry} from '@int/geotoolkit/gauges/registry/GaugeRegistry';
import {Templates} from '@int/geotoolkit/gauges/defaults/Templates';
import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, Output} from '@angular/core';
import {AbstractComponent} from '@int/ng-geotoolkit/common';

export type GaugeValue = number | { name: string, value: number };
export type GaugeRange = Range | { min: number, max: number } | { name: string, value: Range | { min: number, max: number } };
export type GaugeType = Templates;

@Component({
  selector: 'int-gauge',
  templateUrl: './gauge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: AbstractComponent, useExisting: forwardRef(() => GaugeComponent)}]
})
export class GaugeComponent extends AbstractComponent implements OnDestroy {
  protected readonly _registry;
  protected _widget: GaugeWidget;
  protected _gaugeType: GaugeType;

  /**
   * Event raised on value change
   */
  @Output() valueChanged = new EventEmitter<GaugeValue>();

  /**
   * Event raised on range change
   */
  @Output() rangeChanged = new EventEmitter<GaugeRange>();

  /**
   * Event raised on type change
   */
  @Output() typeChanged = new EventEmitter<GaugeType>();

  constructor() {
    super();
    this._widget = new GaugeWidget();
    this._registry = GaugeRegistry.getDefaultInstance();
    this.type = Templates.ClassicCircular;
  }

  /**
   * @inheritDoc
   */
  public get widget(): GaugeWidget {
    return this._widget;
  }

  /**
   * Sets a type of the gauge
   * @param t a gauge type name, see geotoolkit.gauges.defaults.Templates enumeration for details
   */
  @Input()
  public set type(t: GaugeType) {
    if (t !== this._gaugeType) {
      this._widget.gauge = this._registry.createGauge(t);
      this._gaugeType = t;
      this.typeChanged.emit(t);
    }
  }

  /**
   * Gets the type of the gauge
   */
  public get type(): GaugeType {
    return this._gaugeType;
  }

  /**
   * Sets gauge range
   * @param value if the value is Range, then it will be set to a default gauge,
   * if the value has own property 'name' then the range will be set to an axis with the specified name
   */
  @Input()
  public set range(value: GaugeRange) {
    const gauge = this._widget.gauge;
    if (!gauge || !value) {
      return;
    }

    let name: string;
    let range: Range;

    if (value['name']) {
      name = value['name'];
      range = new Range(value['value']);
    } else {
      name = 'mainAxis';
      range = new Range(value);
    }

    if (isIRangeGauge(gauge)) {
      gauge.setRange(range);
      this.rangeChanged.emit(value);
      return;
    }

    if (isIAxisGauge(gauge)) {
      const axis = gauge.getAxis(name);
      if (axis) {
        axis.setRange(value);
        this.rangeChanged.emit(value);
      }
      return;
    }
  }

  /**
   * Sets value to the gauge
   * @param value if the value is number, then it wil be set to a default axis. If it's a JSON object,
   * the provide value will be set to an axis with the given name
   */
  @Input()
  public set value(value: GaugeValue) {
    const gauge = this._widget.gauge;
    if (!gauge) {
      return;
    }

    let name = 'mainAxis';
    if (typeof value === 'object') {
      name = value.name;
      value = value.value;
    }

    if (isIValueGauge(gauge)) {
      gauge.setValue(value);
      this.valueChanged.emit(value);
      return;
    }

    if (isIAxisGauge(gauge)) {
      const axis = gauge.getAxis(name);
      if (axis) {
        axis.setValue(value);
        this.valueChanged.emit(value);
      }
      return;
    }
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
