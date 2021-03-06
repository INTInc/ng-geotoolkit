import { Component } from '@angular/core';

import { DataTable } from '@int/geotoolkit/data/DataTable';
import { Range } from '@int/geotoolkit/util/Range';


@Component({
  selector: 'tutorials-welllog-data',
  templateUrl: './data.component.html'
})
export class DataComponent {

  readonly defaultTemplate = {
    template: {
      type: 'welllog',
      tracks: [
        { name: 'Track # 0', type: 'index' },
        { name: 'Track # 1', type: 'linear', visuals: [{cg_type: 'curve', name: 'CALI'}] },
      ]
    }
  };

  private readonly curveRange = new Range(0, 15);
  private readonly depthIndexes: any = Array.from(Array(15).keys());
  private readonly curve1: DataTable;
  private readonly curve2: DataTable;
  private readonly curveColumns = [
    {name: 'depth', type: 'number', unit: 'ft'},
    {name: 'CALI', type: 'number', unit: 'in'}
  ];
  private readonly curveValues = [
    9.388, 9.242, 9.165, 9.148, 9.212, 9.29, 9.68, 9.808,
    9.725, 9.614, 9.307, 9.39, 9.554, 9.651, 9.535, 9.516
  ];

  private _currentCurveData: DataTable;

  constructor() {
    this.curve1 = new DataTable({
      cols: this.curveColumns,
      colsdata: [this.depthIndexes, this.curveValues],
      meta: { range: this.curveRange, index: 'depth' }
    });

    this.curve2 = new DataTable({
      cols: this.curveColumns,
      colsdata: [this.depthIndexes, this.curveValues.reverse()],
      meta: { range: this.curveRange, index: 'depth' }
    });

    this._currentCurveData = this.curve1;
  }

  onCurveDataToggle(): void {
    this._currentCurveData = this._currentCurveData === this.curve1 ? this.curve2 : this.curve1;
  }

  get data(): DataTable {
    return this._currentCurveData;
  }

  get minDepth () {
    return this.curveRange.getLow();
  }

  get maxDepth () {
    return this.curveRange.getHigh();
  }

}
