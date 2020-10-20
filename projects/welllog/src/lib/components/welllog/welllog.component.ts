import { Point } from '@int/geotoolkit/util/Point';
import { LogTrack } from '@int/geotoolkit/welllog/LogTrack';
import { WellLogWidget } from '@int/geotoolkit/welllog/widgets/WellLogWidget';
import { Events as NodeEvents } from '@int/geotoolkit/scene/Node';
import { DataTable } from '@int/geotoolkit/data/DataTable';
import { DataBinding } from '@int/geotoolkit/data/DataBinding';
import { Transformation } from '@int/geotoolkit/util/Transformation';
import { MathUtil } from '@int/geotoolkit/util/MathUtil';
import { AnnotationOverlay } from '@int/geotoolkit/welllog/widgets/overlays/AnnotationOverlay';
import { PdfExport } from '@int/geotoolkit/pdf/PdfExport';
import { UnitFactory } from '@int/geotoolkit/util/UnitFactory';
import { PaperFormatFactory } from '@int/geotoolkit/scene/exports/PaperFormatFactory';
import { PaperOrientation } from '@int/geotoolkit/scene/exports/PaperOrientation';
import { Orientation } from '@int/geotoolkit/util/Orientation';
import { ScalingOptions } from '@int/geotoolkit/scene/exports/ScalingOptions';
import { mergeObjects } from '@int/geotoolkit/base';
import {
  Component, EventEmitter, forwardRef,
  Input, OnDestroy, Output
} from '@angular/core';

import { ScaleChangedEventArgs, IComponent, AbstractComponent, ValueChangedEventArgs } from '@int/ng-geotoolkit/common';
import { CurveDataBinding } from '../../curvedatabinding';
import { IAnnotation } from '@int/geotoolkit/widgets/overlays/IAnnotation';
import { DataBindingRegistry } from '@int/geotoolkit/data/DataBindingRegistry';

export type WellLogTemplate = string | object;

@Component({
  selector: 'int-welllog',
  exportAs: 'widget',
  templateUrl: './welllog.component.html',
  styleUrls: ['./welllog.component.css'],
  providers: [{provide: AbstractComponent, useExisting: forwardRef(() => WellLogComponent)}]
})
export class WellLogComponent extends AbstractComponent implements IComponent, OnDestroy {

  // region private data members
  private _oldWidgetContainerLocalTr: Transformation;
  private _widget: WellLogWidget;
  private _template: WellLogTemplate;
  private _overlay: AnnotationOverlay;
  private _dataBinding = new CurveDataBinding();
  private _minDepth = 0;
  private _maxDepth = 100;
  // endregion

  // region public events
  /**
   * Raises on template change
   */
  @Output() public templateChanged = new EventEmitter();
  /**
   * Raises on data change
   */
  @Output() public dataChanged = new EventEmitter();
  /**
   * Raises on data binding change
   */
  @Output() public dataBindingChanged = new EventEmitter();
  /**
   * Raises on depth limits change
   */
  @Output() public depthLimitsChanged = new EventEmitter();
  /**
   * Raises on overlay "enabled" state changed
   */
  @Output() public overlayEnabledChanged = new EventEmitter<boolean>();
  /**
   * Raises on overlay visibility changed
   */
  @Output() public overlayVisibleChanged = new EventEmitter<boolean>();
  /**
   * Raises on annotation add
   */
  @Output() public annotationAdded = new EventEmitter<IAnnotation>();

  /**
   * Event raised on scale
   */
  @Output() public scaleChanged = new EventEmitter<ScaleChangedEventArgs>();

  /**
   * Event raised on transformation changed
   */
  @Output() public trackContainerTransformationChanged = new EventEmitter();

  // endregion

  /**
   * Creates a new instance and sets default settings
   */
  constructor() {
    super();
    const options = {
      'horizontalscrollable': false,
      'verticalscrollable': true,
      'trackcontainer': {
        'border': {'visible': true}
      },
      'border': {'visible': true},
      'header': {'visible': true}
    };
    this._widget = new WellLogWidget(options);
    this.widget.getTrackContainer().on(NodeEvents.LocalTransformationChanged,
      this.onWidgetContainerLocalTransformationChanged.bind(this));
    this.widget.setDepthLimits(this._minDepth, this._maxDepth);
    this.widget.setDepthScale(10);
    this.dataBinding = this._dataBinding;
    this._overlay = this.createAnnotationsOverlay();
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
        this.trackContainerTransformationChanged.emit(new ValueChangedEventArgs(
          this,
          this._oldWidgetContainerLocalTr, localTr ));
      }
      this._oldWidgetContainerLocalTr = localTr.clone();
    }
  }

  private updateDepthLimits() {
    this._widget.setDepthLimits(this._minDepth, this._maxDepth);
    this.depthLimitsChanged.emit({ min: this._maxDepth, max: this._maxDepth });
  }

  // region Angular lifecycle
  /**
   * Disposes previously allocated resources and unsubscribes from events.
   */
  ngOnDestroy(): void {
    this.widget.getTrackContainer().off(NodeEvents.LocalTransformationChanged,
      this.onWidgetContainerLocalTransformationChanged.bind(this));
    this._overlay.dispose();
    this._overlay = null;
    super.ngOnDestroy();
  }

  // endregion

  // region property widget: WellLogWidget
  /**
   * Gets a WellLogWidget instance being in use
   */
  public get widget(): WellLogWidget {
    return this._widget;
  }

  // endregion

  // region property template: string
  public get template(): WellLogTemplate {
    return this._template;
  }

  @Input()
  public set template(json: WellLogTemplate) {
    if (this._template !== json) {
      this._template = json;
      this._widget.loadTemplate(JSON.stringify(json));
      this.templateChanged.emit(this._template);
    }
  }

  // endregion

  // region property data:DataTable and helper methods
  /**
   * Gets the data table being in use
   */
  public get data(): DataTable {
    return <DataTable>this._widget.getData();
  }

  /**
   * Sets the data table to the wellog
   * @param data data to be set
   */
  @Input()
  public set data(data: DataTable) {
    this._widget.setData(data);
    this.dataChanged.emit({ data });
  }

  /**
   * Sets data binding
   * @param dataBinding data binding to be set
   */
  @Input()
  public set dataBinding(dataBinding: DataBinding) {
    if (dataBinding != null) {
      const widgetBindingRegistry = this._widget.getDataBinding() as DataBindingRegistry;
      widgetBindingRegistry.remove(this._dataBinding);
      widgetBindingRegistry.add(dataBinding);
      this._dataBinding = dataBinding;
      this.dataBindingChanged.emit({ dataBinding });
    }
  }

  /**
   * Gets data binding being in use
   */
  public get dataBinding(): DataBinding {
    return this._dataBinding;
  }

  /**
   * Set min depth
   * @param value min depth
   */
  @Input()
  public set minDepth(value: number) {
    this._minDepth = value;
    this.updateDepthLimits();
  }

  /**
   * Set max depth
   * @param value max depth
   */
  @Input()
  public set maxDepth(value: number) {
    this._maxDepth = value;
    this.updateDepthLimits();
  }

  // endregion

  // region property enableOverlay: boolean
  /**
   * Sets a flag indicating if the overlay layer is enabled or not.
   * When disabled, tools basically behave as if they were disabled.
   * @param value boolean value to enable or disable the overlay
   */
  @Input()
  public set overlayEnabled(value: boolean) {
    if (this._overlay.getEnabled() === value) {
      return;
    }
    this._overlay.setEnabled(value);
    this.overlayEnabledChanged.emit(value);
  }

  /**
   * Gets overlay status
   */
  public get overlayEnabled(): boolean {
    return this._overlay.getEnabled();
  }

  // endregion

  // region property showOverlay: boolean
  @Input()
  public set overlayVisible(value: boolean) {
    if (this._overlay.getVisible() === value) {
      return;
    }
    this._overlay.setVisible(value);
    this.overlayVisibleChanged.emit(value);
  }

  public get overlayVisible(): boolean {
    return this._overlay.getVisible();
  }

  // endregion

  // region private methods
  private createAnnotationsOverlay() {
    const overlay = new AnnotationOverlay(this.widget);
    overlay.setEnabled(true)
      .setOptions({
        'candelete': true,
        'cancreate': false,
        'canmove': true,
        'canedit': false
      });
    return overlay;
  }

  // endregion

  // region public methods

  /**
   * Adds an annotation to the given log track.
   * @param track the destination track
   * @param text annotation text
   * @param anchor annotation anchor in track model coordinates
   * @param offset offset in device coordinates
   */
  public addAnnotation(track: LogTrack, text: string, anchor: Point, offset?: Point) {
    const canCreate = this._overlay.getOptions()['cancreate'];
    this._overlay.setOptions({'cancreate': true});
    const annotation = this._overlay.addAnnotation({
      'text': text,
      'target': track,
      'anchor': anchor,
      'options': {
        'offset': offset
      }
    });
    this.annotationAdded.emit( annotation );
    this._overlay.setOptions({'cancreate': canCreate});
  }

  /**
   * Exports the components as PDF document
   * @param options export options. See geotoolkit.welllog.widgets.WellLogWidget.exportToPdf for details
   */
  public exportToPdf(options?: object) {
    if (!PdfExport.isSupported()) {
      console.error('Export to PDF is not supported');
      return;
    }
    const px = UnitFactory.getInstance().getUnit('px');
    const defaultOptions = {
      'output': 'export',
      'deviceunit': 'cm',
      'indexunit': 'm',
      'scale': 10,
      'limits': {
        'start': this.widget.getDepthLimits().getLow(),
        'end': this.widget.getDepthLimits().getHigh()
      },
      'printsettings': {
        'paperFormat': PaperFormatFactory.getInstance()
          .getPaper('A4', px, PaperOrientation.Portrait),
        'orientation': this.widget.getOrientation() === Orientation.Horizontal ?
          PaperOrientation.Landscape : PaperOrientation.Portrait,
        'scaling': ScalingOptions.FitWidth,

        'top': 0.5,
        'bottom': 0.5,
        'left': 1,
        'right': 1,
        'keepaspectratio': false,
        'continuous': false,
        'drawwesttoeast': false
      }
    };
    const pdfPrintSettings = mergeObjects(options, defaultOptions);
    if (this.widget) {
      this.widget.exportToPdf(pdfPrintSettings);
    }
  }

  /**
   * Zooms in the component's widget
   * @param scaleX scale factor for Value axis (for vertical tracks - horizontal axis).
   * @param scaleY scale factor for Depth axis (for vertical tracks - vertical axis).
   */
  public zoomIn(scaleX: number = 2, scaleY: number = 2) {
    if (this.widget) {
      this.widget.scale(scaleX, scaleY);
    }
  }

  /**
   * Zooms out the component's widget
   * @param scaleX scale factor for Value axis (for vertical tracks - horizontal axis).
   * @param scaleY scale factor for Depth axis (for vertical tracks - vertical axis).
   */
  public zoomOut(scaleX: number = 0.5, scaleY: number = 0.5) {
    if (this.widget) {
      this.widget.scale(scaleX, scaleY);
    }
  }
  // endregion
}
