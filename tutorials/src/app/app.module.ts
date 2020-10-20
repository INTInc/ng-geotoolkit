import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@int/ng-geotoolkit/common';

import { GaugesTutorialModule } from '@modules/gauges/gauges.module';
import { WelllogTutorialsModule } from '@modules/welllog/welllog.module';
import { SeismicTutorialsModule } from '@modules/seismic/seismic.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GaugesTutorialModule,
    WelllogTutorialsModule,
    SeismicTutorialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
