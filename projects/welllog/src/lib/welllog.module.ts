import { NgModule } from '@angular/core';

import { CommonModule } from '@int/ng-geotoolkit/common';

import { WellLogComponent } from './components/welllog/welllog.component';
import { WellLogNavigationComponent } from './components/welllog-navigation/welllog-navigation.component';

@NgModule({
  declarations: [WellLogComponent, WellLogNavigationComponent],
  imports: [CommonModule],
  exports: [WellLogComponent, WellLogNavigationComponent]
})
export class WellLogModule { }
