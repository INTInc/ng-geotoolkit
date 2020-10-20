import { NgModule } from '@angular/core';

import { CommonModule } from '@int/ng-geotoolkit/common';

import { SeismicComponent } from './components/seismic.component';

@NgModule({
  declarations: [SeismicComponent],
  imports: [CommonModule],
  exports: [SeismicComponent]
})
export class SeismicModule { }
