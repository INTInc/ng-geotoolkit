import { isInstanceOf } from '@int/geotoolkit/base';
import { MultiWellWidget} from '@int/geotoolkit/welllog/multiwell/MultiWellWidget';
import { CorrelationTrack} from '@int/geotoolkit/welllog/multiwell/CorrelationTrack';
import { WellTrack} from '@int/geotoolkit/welllog/multiwell/WellTrack';
import { ProxyWellTrack} from '@int/geotoolkit/welllog/multiwell/ProxyWellTrack';
import {Directive, Input, Output} from '@angular/core';
import {ToolAbstractDirective, AbstractComponent} from '@int/ng-geotoolkit/common';
import { Point } from '@int/geotoolkit/util/Point';
import { CrossHair } from '@int/geotoolkit/controls/tools/CrossHair';

const getToolFromTrack = function (track, toolName) {
  return track instanceof CorrelationTrack || track instanceof ProxyWellTrack || track instanceof WellTrack ?
    track.getToolByName(toolName) : null;
};

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
        const tool = getToolFromTrack(mww.getTrackAt(value[i]), 'cross-hair');
        if (tool) {
          tool.setEnabled(false);
        }
      }
      for (let i = 0; i < value.length; i++) {
        if (value[i] < mww.getTracksCount()) {
          const track = mww.getTrackAt(value[i]);
          if (track) {
            const tool = getToolFromTrack(mww.getTrackAt(value[i]), 'cross-hair');
            if (tool) {
              tool.setEnabled(true);
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
        const tool = getToolFromTrack(mww.getTrackAt(i), 'cross-hair');
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
        const tool = getToolFromTrack(mww.getTrackAt(i), 'cross-hair');
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
        const tool = getToolFromTrack(mww.getTrackAt(i), 'cross-hair');
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
