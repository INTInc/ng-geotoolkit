import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaugesModule } from '@int/ng-geotoolkit/gauges';

import { BaseModule } from '@modules/base/base.module';
import { GaugesIntroductionComponent } from './components/introduction/introduction.component';


@NgModule({
  declarations: [GaugesIntroductionComponent],
  exports: [GaugesIntroductionComponent],
  imports: [
    CommonModule,
    GaugesModule,
    BaseModule
  ]
})
export class GaugesTutorialModule { }
