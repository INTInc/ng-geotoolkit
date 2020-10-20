import { RubberBand } from '@int/geotoolkit/controls/tools/RubberBand';
import {Directive, Input} from '@angular/core';
import {ToolAbstractDirective} from './tool-abstract.directive';
import {AbstractComponent} from '../components/abstract.component';

@Directive({
  selector: 'tool-rubberband',
  exportAs: 'tool'
})
export class ToolRubberzoomDirective extends ToolAbstractDirective {

  constructor(component: AbstractComponent) {
    super('rubberband', component);
  }

  public get tool(): RubberBand {
    return this._tool as RubberBand;
  }

  @Input()
  set enabled(value: boolean) {
    if (this.tool && this.enabled !== value) {
      this.tool.setEnabled(value);
    }
  }

  get enabled(): boolean {
    return this.tool ? this.tool.isEnabled() : false;
  }

  public get autoDisabled(): boolean {
    const rubberBandZoom = this.tool as RubberBand;
    if (rubberBandZoom && (<any>rubberBandZoom).getClassName() === (<any>RubberBand).getClassName()) {
      return rubberBandZoom.isAutoDisabled();
    } else {
      return false;
    }
  }

  @Input()
  public set autoDisabled(value: boolean) {
    const rubberBandZoom = this.tool as RubberBand;
    if (rubberBandZoom && (<any>rubberBandZoom).getClassName() === (<any>RubberBand).getClassName()) {
      rubberBandZoom.setAutoDisabled(value);
    }
  }
}
