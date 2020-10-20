import { isInstanceOf } from '@int/geotoolkit/base';
import { MultiWellWidget} from '@int/geotoolkit/welllog/multiwell/MultiWellWidget';
import {Directive, Input, Output} from '@angular/core';
import {ToolAbstractDirective, AbstractComponent} from '@int/ng-geotoolkit/common';
import { Point } from '@int/geotoolkit/util/Point';
import { CrossHair } from '@int/geotoolkit/controls/tools/CrossHair';

@Directive({
  selector: 'tool-multiwell-crosshair',
  exportAs: 'tool'
})
export class ToolMultiwellCrosshairDirective extends ToolAbstractDirective {

  @Output() position: Point;

  constructor(component: AbstractComponent) {
    super(undefined, component);
  }

  public get tool(): CrossHair {
    return <CrossHair>this._tool;
  }

  @Input()
  set enabledOnTracks(value: number[]) {
    if (this._component && isInstanceOf(this._component.widget, MultiWellWidget)) {
      const mww = this._component.widget as MultiWellWidget;
      for (let i = 0; i < mww.getTracksCount(); i++) {
        const tool = mww.getTrackAt(i).getToolByName('cross-hair');
        if (tool) {
          tool.setEnabled(false);
        }
      }
      for (let i = 0; i < value.length; i++) {
        if (value[i] < mww.getTracksCount()) {
          const track = mww.getTrackAt(value[i]);
          if (track) {
            const tool = mww.getTrackAt(value[i]).getToolByName('cross-hair');
            if (tool) {
              tool.setEnabled(value);
            }
          }
        }
      }
    }
  }

  get enabledOnTracks(): number[] {
    const result = [];
    if (this._component && isInstanceOf(this._component.widget, MultiWellWidget)) {
      const mww = this._component.widget as MultiWellWidget;
      for (let i = 0; i < mww.getTracksCount(); i++) {
        const tool = mww.getTrackAt(i).getToolByName('cross-hair');
        if (tool && tool.isEnabled()) {
          result.push(i);
        }
      }
    }
    return result;
  }

  @Input()
  set enabled(value: boolean) {
    if (this._component && isInstanceOf(this._component.widget, MultiWellWidget)) {
      const mww = this._component.widget as MultiWellWidget;
      for (let i = 0; i < mww.getTracksCount(); i++) {
        const tool = mww.getTrackAt(i).getToolByName('cross-hair');
        if (tool) {
          tool.setEnabled(value);
        }
      }
    }
  }

  get enabled(): boolean {
    let result;

    if (this._component && isInstanceOf(this._component.widget, MultiWellWidget)) {
      const mww = this._component.widget as MultiWellWidget;
      for (let i = 0; i < mww.getTracksCount(); i++) {
        const tool = mww.getTrackAt(i).getToolByName('cross-hair');
        if (tool) {
          if (result === undefined) {
            result = tool.isEnabled();
          } else if (result !== tool.isEnabled()) {
            return undefined;
          }
        }
      }
    }
    return result;
  }
}
