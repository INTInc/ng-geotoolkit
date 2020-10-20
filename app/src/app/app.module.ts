import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CommonModule } from '@int/ng-geotoolkit/common';
import { WellLogModule, MultiwellModule } from '@int/ng-geotoolkit/welllog';
import { SeismicModule } from '@int/ng-geotoolkit/seismic';
import { GaugesModule } from '@int/ng-geotoolkit/gauges';

import { DemoWelllogComponent } from './components/welllog/welllog.component';
import { DemoMultiwellComponent } from './components/multiwell/multiwell.component';
import { DemoGaugesComponent } from './components/gauges/gauges.component';
import { DemoSeismicComponent } from './components/seismic/seismic.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoWelllogComponent,
    DemoMultiwellComponent,
    DemoGaugesComponent,
    DemoSeismicComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    WellLogModule,
    MultiwellModule,
    SeismicModule,
    GaugesModule
    // uncomment this line to imitate node_modules behavior vvv
    // NgGeotoolkitModule
    // uncomment this line to imitate node_modules behavior ^^^
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
