import { Component } from '@angular/core';

import { ColorMap } from '@int/geotoolkit/seismic/util/ColorMap';
import { SeismicColors } from '@int/geotoolkit/seismic/util/SeismicColors';

@Component({
  selector: 'tutorials-seismic-introduction',
  templateUrl: './introduction.component.html'
})
export class SeismicIntroductionComponent {
  private seismicColorMap: ColorMap;

  getColorMap(name: string) {
    if (!this.seismicColorMap || (this.seismicColorMap && this.seismicColorMap.getName() !== name)) {
      this.seismicColorMap = SeismicColors.getDefault().createNamedColorMap(name);
    }
    return this.seismicColorMap;
  }

}
