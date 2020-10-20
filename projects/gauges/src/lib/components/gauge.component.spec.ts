import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Range } from '@int/geotoolkit/util/Range';
import { Templates } from '@int/geotoolkit/gauges/defaults/Templates';

import { GaugeComponent } from './gauge.component';

describe('GaugeComponent', () => {
  let component: GaugeComponent;
  let fixture: ComponentFixture<GaugeComponent>;

  const testGaugeValues = { initial: 10, expected: 20 };
  const testGaugeRanges = { initial: new Range(0, 50), expected: new Range(0, 40) };
  const testGaugeTypes = { initial: Templates.ClassicCircular, expected: Templates.VerticalBoxFillGauge };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change type', () => {
    component.type = testGaugeTypes.initial;
    spyOn(component.typeChanged, 'emit');

    component.type = testGaugeTypes.expected;

    expect(component.type).toBe(testGaugeTypes.expected);
    expect(component.typeChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.typeChanged.emit).toHaveBeenCalledWith(testGaugeTypes.expected);
  });

  it('should change value', () => {
    component.value = testGaugeValues.initial;
    spyOn(component.valueChanged, 'emit');

    component.value = testGaugeValues.expected;

    expect(component.valueChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.valueChanged.emit).toHaveBeenCalledWith(testGaugeValues.expected);
  });

  it('should change range', () => {
    component.range = testGaugeRanges.initial;
    spyOn(component.rangeChanged, 'emit');

    component.range = testGaugeRanges.expected;

    expect(component.rangeChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.rangeChanged.emit).toHaveBeenCalledWith(testGaugeRanges.expected);
  });
});
