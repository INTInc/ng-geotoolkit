import { NgModule } from '@angular/core';

import { CommonModule } from '@int/ng-geotoolkit/common';

import { MultiwellComponent } from './components/multiwell/multiwell.component';
import { ToolMultiwellCrosshairDirective } from './directives/tool-multiwell-crosshair.directive';

@NgModule({
  declarations: [MultiwellComponent, ToolMultiwellCrosshairDirective],
  imports: [CommonModule],
  exports: [MultiwellComponent, ToolMultiwellCrosshairDirective]
})
export class MultiwellModule { }
