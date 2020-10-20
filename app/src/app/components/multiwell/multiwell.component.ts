import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { Range } from '@int/geotoolkit/util/Range';
import { TrackType as MultiTrackType } from '@int/geotoolkit/welllog/multiwell/TrackType';
import { TrackType } from '@int/geotoolkit/welllog/TrackType';
import { IWellTrack } from '@int/geotoolkit/welllog/multiwell/IWellTrack';

import { MultiwellComponent } from '@int/ng-geotoolkit/welllog';

@Component({
  selector: 'app-multiwell',
  templateUrl: './multiwell.component.html'
})
export class DemoMultiwellComponent implements AfterViewInit {

  @ViewChild('multiwell', { static: true }) multiwell: MultiwellComponent;

  constructor() { }

  ngAfterViewInit(): void {
    if (!this.multiwell || !this.multiwell.widget) {
      return;
    }
    this.addTestTracks();
  }

  private addTestTracks() {
    const widget = this.multiwell.widget;
    const well1 = widget.addTrack(MultiTrackType.WellTrack, {
      'range': new Range(0, 500),
      'welllog': {
        'range': new Range(4500, 5000)
      }
    }) as IWellTrack;
    const well2 = widget.addTrack(MultiTrackType.WellTrack, {
      'range': new Range(50, 300),
      'welllog': {
        'range': new Range(2500, 5000)
      }
    }) as IWellTrack;
    const well3 = widget.addTrack(MultiTrackType.WellTrack, {
      'range': new Range(25, 400),
      'welllog': {
        'range': new Range(4700, 5000)
      }
    }) as IWellTrack;
    this.addWellData(well1, 4500);
    this.addWellData(well2, 2500);
    this.addWellData(well3, 4700);
  }

  private addWellData(well: IWellTrack, startDepth: number) {
    well.addTrack(TrackType.IndexTrack);
    well.addTrack(TrackType.LinearTrack);
  }

}
