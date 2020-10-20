import {CrossHair} from '@int/geotoolkit/controls/tools/CrossHair';
import {Point} from '@int/geotoolkit/util/Point';

import {Directive, Output} from '@angular/core';
import {ToolAbstractDirective} from './tool-abstract.directive';
import {AbstractComponent} from '../components/abstract.component';

@Directive({
  selector: 'tool-crosshair',
  exportAs: 'tool'
})
export class ToolCrosshairDirective extends ToolAbstractDirective {

  @Output() position: Point;

  constructor(component: AbstractComponent) {
    super('cross-hair', component);
  }

  public get tool(): CrossHair {
    return this._tool as CrossHair;
  }
}
