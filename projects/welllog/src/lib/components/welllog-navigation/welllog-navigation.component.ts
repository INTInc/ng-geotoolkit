import { Events as SelectionEvents } from '@int/geotoolkit/controls/tools/Selection';
import { from } from '@int/geotoolkit/selection/from';
import { Orientation } from '@int/geotoolkit/util/Orientation';
import { TrackType } from '@int/geotoolkit/welllog/TrackType';
import { LogCurve } from '@int/geotoolkit/welllog/LogCurve';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, Output} from '@angular/core';
import { WellLogComponent } from '../welllog/welllog.component';
import { AbstractComponent } from '@int/ng-geotoolkit/common';
import { Navigation, Events as NavigationEvents } from '@int/geotoolkit/welllog/widgets/tools/Navigation';
import { WellLogWidget } from '@int/geotoolkit/welllog/widgets/WellLogWidget';
import { Events } from '@int/geotoolkit/welllog/widgets/Events';

export interface TargetWellLogChangedArgs {
  old: WellLogComponent;
  new: WellLogComponent;
}

@Component({
  selector: 'int-welllog-navigation',
  exportAs: 'widget',
  templateUrl: './welllog-navigation.component.html',
  styleUrls: ['./welllog-navigation.component.css'],
  providers: [{provide: AbstractComponent, useExisting: forwardRef(() => WellLogNavigationComponent)}]
})
export class WellLogNavigationComponent extends AbstractComponent implements OnDestroy {
  // region private data members
  private readonly _navigationTool: Navigation;
  private readonly _widget: WellLogWidget;
  private _targetWellLog: WellLogComponent;

  // endregion

  // region events
  @Output() targetWellLogChanged = new EventEmitter<TargetWellLogChangedArgs>();

  @Output() scaleChanged = new EventEmitter();

  // endregion

  constructor() {
    super();
    const defaultOptions = {
      'horizontalscrollable': false,
      'verticalscrollable': false,
      'trackcontainer': {
        'border': {'visible': false}
      },
      'header': {
        'visible': false
      },
      'border': {'visible': true}
    };

    this._widget = new WellLogWidget(defaultOptions);
    this.widget.setDataBinding(null);
    this.widget.addTrack(TrackType.IndexTrack)
    // .setWidth(40)
      .addChild([
        new LogCurve(null)
      ]);

    this.widget.fitToHeight();

    // initializing tools
    // do not allow user to select visuals
    this.widget.getToolByName('pick')
      .setEnabled(false);
    // do not allow user to pinchzoom index track
    this.widget.getToolByName('TrackZoom')
      .setEnabled(false);
    // do not allow user resize tracks
    this.widget.getToolByName('splitter')
      .setEnabled(false);
    // disable cross-hair
    this.widget.getToolByName('cross-hair')
      .setEnabled(false);
    // and change scale
    this.widget.getToolByName('TrackPanning')
      .setEnabled(true);


    this._navigationTool = new Navigation(this.widget.getToolByName('cross-hair').getManipulatorLayer());
    this.widget.getTool().add(this._navigationTool);


    this._navigationTool.on(NavigationEvents.DepthRangeChanged,
      (event, sender, eventArgs) => {
        if (this.targetWellLog && this.targetWellLog.widget) {
          this.targetWellLog.widget.setVisibleDepthLimits(eventArgs.getLimits());
        }
      });
  }

  // region property targetWellLog: WellLogComponent and associated methods
  get targetWellLog(): WellLogComponent {
    return this._targetWellLog;
  }

  private subscribeTarget(target: WellLogComponent): void {
    target.widget.on(
      Events.DepthRangeChanged, this.setDepthLimits.bind(this));
    target.widget.on(
      Events.VisibleDepthLimitsChanged, this.setVisibleDepthLimits.bind(this));
    target.widget.getToolByName('pick')
      .on(SelectionEvents.onSelectionChanged, this.handleSelectionChangedEvent);
  }

  private unsubscribeTarget(target: WellLogComponent): void {
    target.widget.getToolByName('pick')
        .off(SelectionEvents.onSelectionChanged, this.handleSelectionChangedEvent);
    target.widget.off(
        Events.DepthRangeChanged, this.setDepthLimits.bind(this));
    target.widget.off(
        Events.VisibleDepthLimitsChanged, this.setVisibleDepthLimits.bind(this));
  }

  @Input() set targetWellLog(value: WellLogComponent) {
    if (value === this.targetWellLog) {
      return;
    }

    if (this.targetWellLog && this.targetWellLog.widget) {
      this.unsubscribeTarget(this.targetWellLog);
    }
    const oldValue = this.targetWellLog;
    this._targetWellLog = value;
    this.targetWellLogChanged.emit({'old': oldValue, 'new': value});
    if (!value) {
      return;
    }

    this.setDepthLimits();
    this._navigationTool.setVisibleDepthLimits(this.targetWellLog.widget.getVisibleDepthLimits());

    this.subscribeTarget(this.targetWellLog);
  }

  private handleSelectionChangedEvent(event, sender, eventArgs) {
    if (eventArgs.getSelection().length === 0) {
      return;
    }
    eventArgs.getSelection()
      .forEach((selection) => {
        if (selection instanceof LogCurve) {
          from(this.widget)
            .where((node) => {
              return node instanceof LogCurve;
            })
            .select((curve) => {
              curve.setLineStyle(selection.getLineStyle()).setData(selection.getDataSource(), true, true);
            });
        }
      });
  }

  private setVisibleDepthLimits() {
    if (this.targetWellLog && this.targetWellLog.widget) {
      this._navigationTool.setVisibleDepthLimits(this.targetWellLog.widget.getVisibleDepthLimits());
    }
  }

  private setDepthLimits() {
    if (this.targetWellLog && this.targetWellLog.widget) {
      this.widget.setDepthLimits(this.targetWellLog.widget.getDepthLimits());
       // if (!this._navigationTool.getVisibleDepthLimits().equalsRange(this.targetWellLog.widget.getVisibleDepthLimits(), 1)) {
        this._navigationTool.setVisibleDepthLimits(this.targetWellLog.widget.getVisibleDepthLimits());
       // }
      if (this.widget.getOrientation() === Orientation.Vertical) {
        this.widget.fitToHeight();
      } else {
        this.widget.fitToWidth();
      }
    }
  }

  // endregion

  // region property widget: WellLogWidget
  public get widget(): WellLogWidget {
    return this._widget;
  }

  // endregion

  // region methods zoomIn(), zoomOut()
  public zoomIn(scaleX: number = 2, scaleY: number = 2) {
    this.zoom(scaleX, scaleY);
  }

  public zoomOut(scaleX: number = 0.5, scaleY: number = 0.5) {
    this.zoom(scaleX, scaleY);
  }

  private zoom(scaleX: number, scaleY: number) {
    if (this.widget) {
      this.widget.scale(scaleY, scaleX);
    }
  }

  // endregion

  ngOnDestroy(): void {
    if (this.targetWellLog && this.targetWellLog.widget) {
      this.unsubscribeTarget(this.targetWellLog);
    }
    super.ngOnDestroy();
  }
}
