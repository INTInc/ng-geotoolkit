import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeismicModule } from '@int/ng-geotoolkit/seismic';

import { BaseModule } from '@modules/base/base.module';
import { SeismicIntroductionComponent } from './components/introduction/introduction.component';


@NgModule({
  declarations: [SeismicIntroductionComponent],
  exports: [SeismicIntroductionComponent],
  imports: [
    CommonModule,
    SeismicModule,
    BaseModule
  ]
})
export class SeismicTutorialsModule { }
