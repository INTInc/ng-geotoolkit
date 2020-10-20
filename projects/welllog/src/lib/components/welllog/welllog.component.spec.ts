import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTable } from '@int/geotoolkit/data/DataTable';
import { Range } from '@int/geotoolkit/util/Range';

import { WellLogComponent } from './welllog.component';
import { CurveDataBinding } from '../../curvedatabinding';

describe('WellLogComponent', () => {
  let component: WellLogComponent;
  let fixture: ComponentFixture<WellLogComponent>;

  const testTemplate = {
    template: {
      type: 'welllog',
      tracks: [
        { name: 'Track # 0', type: 'index' },
        { name: 'Track # 1', type: 'linear', visuals: [{cg_type: 'curve', name: 'CALI'}] },
      ]
    }
  };
  const curveColumns = [
    {name: 'depth', type: 'number', unit: 'ft'},
    {name: 'CALI', type: 'number', unit: 'in'}
  ];
  const curveValues = [
    9.388, 9.242, 9.165, 9.148, 9.212, 9.29, 9.68, 9.808,
    9.725, 9.614, 9.307, 9.39, 9.554, 9.651, 9.535, 9.516
  ];
  const curveRange = new Range(0, 15);
  const depthIndexes: any = Array.from(Array(15).keys());
  const testDataTable = new DataTable({
    cols: curveColumns,
    colsdata: [depthIndexes, curveValues],
    meta: { range: curveRange, index: 'depth' }
  });
  const testDataBinding = new CurveDataBinding();
  const testOverlayEnabledValues = { initial: false, expected: true };
  const testOverlayVisibleValues = { initial: false, expected: true };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change template', () => {
    spyOn(component.templateChanged, 'emit');

    component.template = testTemplate;

    expect(component.template).toBe(testTemplate);
    expect(component.templateChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.templateChanged.emit).toHaveBeenCalledWith(testTemplate);
  });

  it('should enable overlay', () => {
    component.overlayEnabled = testOverlayEnabledValues.initial;
    spyOn(component.overlayEnabledChanged, 'emit');

    component.overlayEnabled = testOverlayEnabledValues.expected;

    expect(component.overlayEnabled).toBe(testOverlayEnabledValues.expected);
    expect(component.overlayEnabledChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.overlayEnabledChanged.emit).toHaveBeenCalledWith(testOverlayEnabledValues.expected);
  });

  it('should set overlay visible', () => {
    component.overlayVisible = testOverlayVisibleValues.initial;
    spyOn(component.overlayVisibleChanged, 'emit');

    component.overlayVisible = testOverlayVisibleValues.expected;

    expect(component.overlayVisible).toBe(testOverlayVisibleValues.expected);
    expect(component.overlayVisibleChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.overlayVisibleChanged.emit).toHaveBeenCalledWith(testOverlayVisibleValues.expected);
  });

  it('should set data', () => {
    spyOn(component.dataChanged, 'emit');
    component.data = testDataTable;

    expect(component.data).toBe(testDataTable);
    expect(component.dataChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.dataChanged.emit).toHaveBeenCalledWith({ data: testDataTable });
  });

  it('should set data binding', () => {
    spyOn(component.dataBindingChanged, 'emit');
    component.dataBinding = testDataBinding;

    expect(component.dataBinding).toBe(testDataBinding);
    expect(component.dataBindingChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.dataBindingChanged.emit).toHaveBeenCalledWith({ dataBinding: testDataBinding });
  });

  it('should set depth limits', () => {
    spyOn(component.depthLimitsChanged, 'emit');
    component.minDepth = 1;
    component.maxDepth = 10;

    expect(component.depthLimitsChanged.emit).toHaveBeenCalledTimes(2);
  });

  it('should change scale on zoom', () => {
    spyOn(component.scaleChanged, 'emit');

    component.zoomIn();

    expect(component.scaleChanged.emit).toHaveBeenCalledTimes(1);
  });

});
