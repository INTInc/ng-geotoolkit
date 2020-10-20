import { Component, OnInit, ViewChild } from '@angular/core';

import { MultiwellComponent } from '@int/ng-geotoolkit/welllog';

import { TrackType as MultiTrackType } from '@int/geotoolkit/welllog/multiwell/TrackType';
import { TrackType } from '@int/geotoolkit/welllog/TrackType';
import { IWellTrack } from '@int/geotoolkit/welllog/multiwell/IWellTrack';
import { Range } from '@int/geotoolkit/util/Range';

@Component({
  selector: 'tutorials-multiwell-introduction',
  templateUrl: './introduction.component.html'
})
export class MultiWellIntroductionComponent implements OnInit {

  @ViewChild(MultiwellComponent, { static: true }) multiwell: MultiwellComponent;

  ngOnInit() {
    if (!this.multiwell || !this.multiwell.widget) {
      return;
    }
    this.addTestTracks();
  }

  private addWellData(well: IWellTrack) {
    well.addTrack(TrackType.IndexTrack);
    well.addTrack(TrackType.LinearTrack);
  }

  private addTestTracks() {
    const widget = this.multiwell.widget;
    const well1 = widget.addTrack(MultiTrackType.WellTrack, {
      range: new Range(0, 500),
      welllog: {
        range: new Range(4500, 5000)
      }
    }) as IWellTrack;
    const well2 = widget.addTrack(MultiTrackType.WellTrack, {
      range: new Range(50, 300),
      welllog: {
        range: new Range(2500, 5000)
      }
    }) as IWellTrack;
    const well3 = widget.addTrack(MultiTrackType.WellTrack, {
      range: new Range(25, 400),
      welllog: {
        range: new Range(4700, 5000)
      }
    }) as IWellTrack;
    this.addWellData(well1);
    this.addWellData(well2);
    this.addWellData(well3);
  }

}
