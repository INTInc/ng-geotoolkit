import { Component, ViewChild } from '@angular/core';

import { ColorMap } from '@int/geotoolkit/seismic/util/ColorMap';
import { SeismicColors } from '@int/geotoolkit/seismic/util/SeismicColors';

import { SeismicComponent } from '@int/ng-geotoolkit/seismic';

import { SeismicReader } from './SeismicReader';
import { MemoryReader } from '@int/geotoolkit/seismic/data/MemoryReader';
import { SeismicReader as GeoSeismicReader } from '@int/geotoolkit/seismic/data/SeismicReader';

@Component({
  selector: 'app-seismic',
  templateUrl: './seismic.component.html'
})
export class DemoSeismicComponent {

  private readonly _memoryReader: MemoryReader;
  private _remoteReader: GeoSeismicReader;
  private _seismicColorMap: ColorMap;
  private _currentSeismicReader: MemoryReader | GeoSeismicReader;

  @ViewChild('seismic', { static: true }) seismic: SeismicComponent;

  constructor() {
    this._memoryReader = SeismicReader.createMemoryReader(10, 50, 1);
    SeismicReader.createRemoteReader().then((reader) => this._remoteReader = reader);
    this._currentSeismicReader = this._memoryReader;
  }

  onScaleChanged() {
    // console.log('Scale changed');
  }

  onSetRemoteReader() {
    this._currentSeismicReader = this._remoteReader;
  }

  onSetMemoryReader() {
    this._currentSeismicReader = this._memoryReader;
  }

  getColorMap(name: string) {
    if (!this._seismicColorMap || (this._seismicColorMap && this._seismicColorMap.getName() !== name)) {
      this._seismicColorMap = SeismicColors.getDefault().createNamedColorMap(name);
    }
    return this._seismicColorMap;
  }

  get currentReader() {
    return this._currentSeismicReader;
  }

}
