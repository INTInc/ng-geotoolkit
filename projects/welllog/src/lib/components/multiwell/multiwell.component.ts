import { MultiWellWidget } from '@int/geotoolkit/welllog/multiwell/MultiWellWidget';
import { Events as NodeEvents } from '@int/geotoolkit/scene/Node';
import { MathUtil } from '@int/geotoolkit/util/MathUtil';
import { BrowserInfo } from '@int/geotoolkit/util/BrowserInfo';
import { Transformation } from '@int/geotoolkit/util/Transformation';
import { UnitFactory } from '@int/geotoolkit/util/UnitFactory';
import { PaperFormatFactory } from '@int/geotoolkit/scene/exports/PaperFormatFactory';
import { PaperOrientation } from '@int/geotoolkit/scene/exports/PaperOrientation';
import { ScalingOptions } from '@int/geotoolkit/scene/exports/ScalingOptions';
import { ImageCompression } from '@int/geotoolkit/pdf/ImageCompression';
import { mergeObjects } from '@int/geotoolkit/base';
import { Component, EventEmitter, forwardRef, OnDestroy, Output } from '@angular/core';
import { AbstractComponent, ScaleChangedEventArgs, ValueChangedEventArgs } from '@int/ng-geotoolkit/common';

@Component({
  selector: 'int-multiwell',
  templateUrl: './multiwell.component.html',
  styleUrls: ['./multiwell.component.css'],
  providers: [{ provide: AbstractComponent, useExisting: forwardRef(() => MultiwellComponent) }]
})
export class MultiwellComponent extends AbstractComponent implements OnDestroy {

  private _oldWidgetContainerLocalTr: Transformation;
  private _widget: MultiWellWidget;

  // region public events
  /**
   * Event raised on scale
   */
  @Output() public scaleChanged = new EventEmitter<ScaleChangedEventArgs>();

  /**
   * Event raised on transformation changed
   */
  @Output() public transformationChanged = new EventEmitter();
  // endregion

  /**
   * Creates a new instance of geotoolkit.welllog.multiwell.MultiWellWidget and sets is to widget property
   */
  constructor() {
    super();
    this._widget = new MultiWellWidget()
      .setLayoutStyle({ 'left': 0, 'top': 0, 'right': 0, 'bottom': 0 });
    // this.addTestTracks();
    this.widget.getTrackContainer().on(NodeEvents.LocalTransformationChanged,
      this.onWidgetContainerLocalTransformationChanged.bind(this));
  }

  private onWidgetContainerLocalTransformationChanged(e, arg) {
    const localTr = this.widget.getTrackContainer().getLocalTransform();
    if (localTr && (!this._oldWidgetContainerLocalTr ||
      Math.abs(localTr.getScaleX() - this._oldWidgetContainerLocalTr.getScaleX()) > MathUtil.epsilon ||
      Math.abs(localTr.getScaleY() - this._oldWidgetContainerLocalTr.getScaleY()) > MathUtil.epsilon)) {

      this.scaleChanged.emit(new ScaleChangedEventArgs(this,
        {
          'scaleX': this._oldWidgetContainerLocalTr ? this._oldWidgetContainerLocalTr.getScaleX() : null,
          'scaleY': this._oldWidgetContainerLocalTr ? this._oldWidgetContainerLocalTr.getScaleY() : null
        },
        {
          'scaleX': localTr.getScaleX(),
          'scaleY': localTr.getScaleY()
        }));
      if (!this._oldWidgetContainerLocalTr || !this._oldWidgetContainerLocalTr.fastEquals(localTr)) {
        this.transformationChanged.emit(new ValueChangedEventArgs(
          this,
          this._oldWidgetContainerLocalTr, localTr));
      }
      this._oldWidgetContainerLocalTr = localTr.clone();
    }
  }

  /**
   * Gets a MultiWellWidget instance being in use
   */
  get widget(): MultiWellWidget {
    return this._widget;
  }

  /**
   * Exports the component to PDF document with default parameters.
   * See MultiWellWidget.exportToPDF for details.
   * @param options Export options. See MultiWellWidget.exportToPDF for details
   */
  public exportToPdf(options?: any) {
    const limits = this._widget.getCenterModelLimits();
    const browserInfo = new BrowserInfo();
    const px = UnitFactory.getInstance().getUnit('px');
    // firefox has a bad performance with compression
    const compression = browserInfo['isFirefox'] !== true;
    const defaultOptions = {
      'output': 'Widget',
      'printsettings': {
        'paperFormat': PaperFormatFactory.getInstance()
          .getPaper('A4', px, PaperOrientation.Portrait),
        'scaling': ScalingOptions.FitWidth,

        'top': 0.5,
        'bottom': 0.5,
        'left': 1,
        'right': 1,
        'keepaspectratio': false,
        'continuous': false,
        'drawwesttoeast': false
      },
      'limits': {
        'x1': limits.getLeft(),
        'x2': limits.getRight(),
        'y1': limits.getTop(),
        'y2': limits.getBottom()
      },
      // 'header': new geotoolkit.scene.exports.HeaderComponent(600, 20, 'PDF Output'),
      // 'footer': new geotoolkit.scene.exports.FooterComponent(600, 20),
      'imagecompression': {
        'mode': ImageCompression.NONE
      },
      'streamcompression': compression
    };
    const printOptions = mergeObjects(options, defaultOptions);
    this._widget.exportToPdf(printOptions);
  }

  /**
   * Zoom in the component contents
   * @param scaleX scale factor for X axis
   * @param scaleY scale factor for Y axis
   */
  public zoomIn(scaleX = 2, scaleY = 2) {
    if (this.widget) {
      this.widget.scale(scaleX, scaleY);
    }
  }

  /**
   * Zoom out the component contents
   * @param scaleX scale factor for X axis
   * @param scaleY scale factor for Y axis
   */
  public zoomOut(scaleX = 0.5, scaleY = 0.5) {
    if (this.widget) {
      this.widget.scale(scaleX, scaleY);
    }
  }

  ngOnDestroy(): void {
    this.widget.getTrackContainer().off(NodeEvents.LocalTransformationChanged,
      this.onWidgetContainerLocalTransformationChanged.bind(this));
    super.ngOnDestroy();
  }
}
