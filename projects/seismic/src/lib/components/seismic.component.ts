import {AbstractUnit} from '@int/geotoolkit/util/AbstractUnit';
import {SeismicReader} from '@int/geotoolkit/seismic/data/SeismicReader';
import {SeismicViewWidget} from '@int/geotoolkit/seismic/widgets/SeismicViewWidget';
import {Transformation} from '@int/geotoolkit/util/Transformation';
import {Events} from '@int/geotoolkit/scene/Node';
import {MathUtil} from '@int/geotoolkit/util/MathUtil';
import {MemoryReader} from '@int/geotoolkit/seismic/data/MemoryReader';
import {SeismicPipeline} from '@int/geotoolkit/seismic/pipeline/SeismicPipeline';
import {SeismicColors} from '@int/geotoolkit/seismic/util/SeismicColors';
import {SeismicWidget} from '@int/geotoolkit/seismic/widgets/SeismicWidget';
import {ColorBarLocation} from '@int/geotoolkit/controls/shapes/ColorBarLocation';
import {Alignment} from '@int/geotoolkit/layout/BoxLayout';
import {AnnotationLocation} from '@int/geotoolkit/layout/AnnotationLocation';
import {UnitFactory} from '@int/geotoolkit/util/UnitFactory';
import {PaperFormatFactory} from '@int/geotoolkit/scene/exports/PaperFormatFactory';
import {PaperOrientation} from '@int/geotoolkit/scene/exports/PaperOrientation';
import {mergeObjects} from '@int/geotoolkit/base';
import {NodeAdapter} from '@int/geotoolkit/scene/exports/NodeAdapter';
import {PdfExport} from '@int/geotoolkit/pdf/PdfExport';
import {StringStream} from '@int/geotoolkit/util/stream/StringStream';
import {CompositeDocumentElement} from '@int/geotoolkit/scene/exports/CompositeDocumentElement';
import {FreeLayout} from '@int/geotoolkit/scene/exports/FreeLayout';
import {Document} from '@int/geotoolkit/scene/exports/Document';
import {Component, EventEmitter, forwardRef, Input, OnDestroy, Output} from '@angular/core';

import {AbstractComponent, ScaleChangedEventArgs, ValueChangedEventArgs} from '@int/ng-geotoolkit/common';
import {ColorMap} from '@int/geotoolkit/seismic/util/ColorMap';
import {NormalizationType} from '@int/geotoolkit/seismic/pipeline/NormalizationType';
import {Range} from '@int/geotoolkit/util/Range';
import {NodeExport} from '@int/geotoolkit/scene/exports/NodeExport';
import {ScalingOptions} from '@int/geotoolkit/scene/exports/ScalingOptions';
import DocumentExportSettings = PdfExport.DocumentExportSettings;

@Component({
  selector: 'int-seismic',
  exportAs: 'widget',
  templateUrl: './seismic.component.html',
  styleUrls: ['./seismic.component.css'],
  providers: [{provide: AbstractComponent, useExisting: forwardRef(() => SeismicComponent)}]
})
export class SeismicComponent extends AbstractComponent implements OnDestroy {
  // region private data members
  private _oldWidgetTr: Transformation;
  private _widget: SeismicViewWidget;
  // endregion

  // region public events
  /**
   * Event raised on reader change
   */
  @Output() readerChanged = new EventEmitter();

  /**
   * Event raised on scale
   */
  @Output() scaleChanged = new EventEmitter<ScaleChangedEventArgs>();

  /**
   * Event raised on transformation changed
   */
  @Output() transformationChanged = new EventEmitter();

  /**
   * Event raised on color map changed
   */
  @Output() colorMapChanged = new EventEmitter();

  // endregion

  /**
   * Creates a new instance
   */
  constructor() {
    super();
    this.initialize(this.createReader());
  }

  private initialize(reader: SeismicReader) {
    // create pipeline
    const pipeline = this.createPipeline(reader);
    if (this._widget) {
      // replace the existing pipeline
      const oldOptions = this._widget.getPipeline().getOptions();
      pipeline.setOptions(oldOptions);
      this._widget.setPipeline(pipeline, false);
    } else {
      // Create a widget to display a model
      this._widget = this.createWidget(pipeline);
      this._widget.getModel().on(Events.LocalTransformationChanged, this.onWidgetLocalTransformChanged.bind(this));
    }
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

  private onWidgetLocalTransformChanged(e, arg) {
    const localTr = this.widget.getModel().getLocalTransform();
    if (localTr && (!this._oldWidgetTr ||
      Math.abs(localTr.getScaleX() - this._oldWidgetTr.getScaleX()) > MathUtil.epsilon ||
      Math.abs(localTr.getScaleY() - this._oldWidgetTr.getScaleY()) > MathUtil.epsilon)) {
      this.scaleChanged.emit(new ScaleChangedEventArgs(this,
        {
          'scaleX': this._oldWidgetTr ? this._oldWidgetTr.getScaleX() : null,
          'scaleY': this._oldWidgetTr ? this._oldWidgetTr.getScaleY() : null
        },
        {
          'scaleX': localTr.getScaleX(),
          'scaleY': localTr.getScaleY()
        }));
      if (!this._oldWidgetTr || !this._oldWidgetTr.fastEquals(localTr)) {
        this.transformationChanged.emit(new ValueChangedEventArgs(
          this,
          this._oldWidgetTr, localTr ));
      }
      this._oldWidgetTr = localTr.clone();
    }
  }

  // region property widget: BaseWidget
  /**
   * Gets SeismicViewWidget instance being in use
   */
  public get widget(): SeismicViewWidget {
    return this._widget;
  }

  // endregion

  // region property reader: SeismicReader
  /**
   * Sets a data reader
   * @param rdr a seismic reader to set
   */
  @Input()
  public set reader(rdr: SeismicReader) {
    if (!rdr) {
      throw new Error('reader can not be null');
    }
    this.initialize(rdr);
    this.readerChanged.emit(rdr);
  }

  /**
   * Gets a data reader
   */
  public get reader(): SeismicReader {
    return this._widget.getPipeline().getReader();
  }
  // endregion


  // region property colorMap: ColorMap
  /**
   * Sets a color map to the seismic
   * @param value a color map to set
   */
  @Input()
  public set colorMap(value: ColorMap) {
    if (this._widget && this._widget.getPipeline()) {
      this._widget.getPipeline().setColorMap(value);
      this.colorMapChanged.emit();
    }
  }

  /**
   * Gets a color map used in seismic widget.
   */
  public get colorMap(): ColorMap {
    return this._widget.getPipeline().getColorMap();
  }
  // endregion

  // region property scaleOptions: any
  /**
   * Sets scale options
   * @param opt Options to set. See SeismicViewWidget.setScaleOptions for details
   */
  @Input()
  public set scaleOptions(opt: {
    deviceunit: AbstractUnit;
    sampleunit: AbstractUnit | null;
    tracescale: number;
    samplescale: number
  } | object) {
    if (this._widget) {
      this._widget.setScaleOptions(opt);
    }
  }

  /**
   * Gets geotoolkit.seismic.widgets.SeismicViewWidget options
   */
  public get scaleOptions() {
    return this._widget.getScaleOptions();
  }
  // endregion

  // region private API
  private createReader() {
    const sampleRate = 1;
    const sampleCount = 60;
    const traceCount = 50;

    return new MemoryReader({
      'numberoftraces': traceCount,
      'numberofsamples': sampleCount,
      'samplerate': sampleRate
    })
      .setTraceProcessor({
          'getTraceData': function (reader, trace, traceId) {
            for (let i = 0; i < sampleCount; i++) {
              trace[i] = Math.sin((i / 10.0 + traceId / 4.0) * Math.PI);
            }
          },
          'getDataStatistics': function () {
            return {
              'average': 0,
              'min': -1,
              'max': 1,
              'rms': Math.sqrt(2) / 2
            };
          }
        }
      );
  }

  private createPipeline(reader) {
    const pipeline = new SeismicPipeline({
      'name': 'MemorySeismic',
      'reader': reader,
      'statistics': reader.getStatistics()
    });
    const colorProvider = SeismicColors.getDefault();
    // TODO add API for plottype
    pipeline.setOptions({
      'colors': {
        'colormap': 'RedWhiteBlack'
      },
      'normalization': {
        'type': NormalizationType.Limits,
        'limits': new Range(-1, 1)
      },
      'plot': {
        'type': {
          'wiggle': true,
          'interpolateddensity': true
        },
        'decimationspacing': 5
      }
    });
    return pipeline;
  }

  private createWidget(pipeline) {
    const widget = new SeismicWidget(pipeline)
      .setLayoutStyle({
        'left': 0,
        'top': 0,
        'bottom': 0,
        'right': 0
      })
      .setOptions({
        'layouttype': 'inside',
        'statusbar': {
          'visible': false
        },
        'colorbar': {
          'axis': {
            'size': 30
          },
          'title': {
            'size': 20
          },
          'colorbox': {
            'size': 10
          },
          'location': ColorBarLocation.West,
          'maxheight': '90%',
          'alignment': Alignment.Center
        }, 'title': {
          'text': 'Seismic Widget',
          'location': AnnotationLocation.North,
          'visible': true
        }, 'axes': {
          'samples': {
            'size': 50
          }
        }
      })
      .setScaleOptions({
        'tracescale': 3,
        'samplescale': 30,
        'deviceunit': 'in',
        'sampleunit': 'ms'
      });
    return widget;
  }

  // endregion

  // region public API
  /**
   * Exports current component as PDF document with default settings.
   * @param options Alternate options for exporting. See geotoolkit.seismic.widgets.SeismicViewWidget.exportToPdf
   * for details
   */
  public exportToPdf(options?: any) {
    // Compute default paper format
    const px = UnitFactory.getInstance().getUnit('px');
    const paper = PaperFormatFactory.getInstance()
      .getPaper('Letter', px, PaperOrientation.Portrait);

    // Default settings
    const defaultOptions: DocumentExportSettings = {
      'paperformat': paper,
      'units': 'in',
      'scaling': ScalingOptions.AsIs
    };
    const printSettings = mergeObjects(options, defaultOptions);

    const bounds = this._widget.getBounds();
    const plotElement = new NodeAdapter(this._widget, bounds)
      .setBounds(bounds);

    const components = [plotElement];
    // Create document to export
    const pdfExport = new PdfExport();
    const pdfStream = new StringStream();
    const root = new CompositeDocumentElement(components,
      new FreeLayout(bounds.getWidth(), bounds.getHeight()));
    const document = new Document(root, null, null, true);
    pdfExport.documentExportToPdfStreamAsync(document, printSettings, pdfStream).then(
      function (stream) {
        stream.save('PDF Output', !PdfExport.isSupported());
      }
    );
  }
  // endregion

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    if (this._widget && this._widget.getModel()) {
      this._widget.getModel().off(Events.LocalTransformationChanged, this.onWidgetLocalTransformChanged.bind(this));
    }
    super.ngOnDestroy();
  }
}
