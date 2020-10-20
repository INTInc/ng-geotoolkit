import { Input, Directive } from '@angular/core';
import {AbstractComponent} from '../components/abstract.component';
import {AbstractTool} from '@int/geotoolkit/controls/tools/AbstractTool';

@Directive()
export abstract class ToolAbstractDirective {
  protected _tool: AbstractTool;

  public get tool(): AbstractTool {
    return this._tool;
  }

  constructor(private _toolName: string, protected _component: AbstractComponent) {
    if (_toolName) {
      if (_component && _component.widget) {
        this._tool = _component.widget.getToolByName(_toolName);
      }
    }
  }

  @Input()
  public set enabled(value: boolean) {
    if (this.tool && this.enabled !== value) {
      this.tool.setEnabled(value);
    }
  }

  public get enabled(): boolean {
    return this.tool ? this.tool.isEnabled() : false;
  }
}
