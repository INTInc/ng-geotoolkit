import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { PointerMode } from '@int/geotoolkit/controls/tools/PointerMode';
import { Point } from '@int/geotoolkit/util/Point';
import { DataTable } from '@int/geotoolkit/data/DataTable';

import { WellLogComponent, LasSource } from '@int/ng-geotoolkit/welllog';

import { template0, template1 } from 'app/templates/welllog-template';

@Component({
  selector: 'app-welllog',
  templateUrl: './welllog.component.html',
  styleUrls: ['./welllog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoWelllogComponent implements OnInit {

  private _navigationWellLog: WellLogComponent;
  private _isOverlayVisible: boolean;
  private _isOverlayEnabled: boolean;
  private _welllogData: DataTable;
  private _welllogMinDepth: number;
  private _welllogMaxDepth: number;

  @ViewChild('wellLog', { static: true }) wellLog: WellLogComponent;
  @ViewChild('wellLog2', { static: true }) wellLog2: WellLogComponent;

  ngOnInit(): void {
    if (!this.wellLog || !this.wellLog.widget) {
      return;
    }
    this._navigationWellLog = this.wellLog;
    this._isOverlayEnabled = this.wellLog.overlayEnabled;
    this._isOverlayVisible = this.wellLog.overlayVisible;
  }

  // addAnnotation() {
  //   this.wellLog.addAnnotation(this.wellLog.widget.getTrackAt(1), 'test\nannotation', new Point(0, 10));
  // }

  async loadLasData() {
    const las = new LasSource();
    this._welllogData = await las.openFromServer('assets/data', 'sample.las');
    const range = this._welllogData.getColumnByName(this._welllogData.getMetaData()['index']).toArray();
    this._welllogMinDepth = range[0];
    this._welllogMaxDepth = range[range.length - 1];
  }

  get data (): DataTable {
    return this._welllogData;
  }

  get minDepth (): number {
    return this._welllogMinDepth;
  }

  get maxDepth (): number {
    return this._welllogMaxDepth;
  }

  get templates () {
    return [template0, template1];
  }

  get navigationWellLog (): WellLogComponent {
    return this._navigationWellLog;
  }

  get isOverlayVisible (): boolean {
    return this._isOverlayVisible;
  }

  get isOverlayEnabled (): boolean {
    return this._isOverlayEnabled;
  }

  onNavigationWellToggle (): void {
    this._navigationWellLog = this._navigationWellLog === this.wellLog ? this.wellLog2 : this.wellLog;
  }

  // onOverlayEnabledToggle () {
  //   this._isOverlayEnabled = !this._isOverlayEnabled;
  // }
  //
  // onOverlayVisibleToggle () {
  //   this._isOverlayVisible = !this._isOverlayVisible;
  // }

}
