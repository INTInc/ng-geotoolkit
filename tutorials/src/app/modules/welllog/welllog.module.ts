import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WellLogModule, MultiwellModule } from '@int/ng-geotoolkit/welllog';

import { BaseModule } from '@modules/base/base.module';
import { WelllogIntroductionComponent } from './components/welllog/introduction/introduction.component';
import { MultiWellIntroductionComponent } from './components/multiwell/introduction/introduction.component';
import { DataComponent } from './components/welllog/data/data.component';


@NgModule({
  declarations: [WelllogIntroductionComponent, MultiWellIntroductionComponent, DataComponent],
  exports: [WelllogIntroductionComponent, MultiWellIntroductionComponent, DataComponent],
  imports: [
    CommonModule,
    WellLogModule,
    MultiwellModule,
    BaseModule
  ]
})
export class WelllogTutorialsModule { }
