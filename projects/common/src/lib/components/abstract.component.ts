import { warn } from '@int/geotoolkit/base';
import { Plot } from '@int/geotoolkit/plot/Plot';
import {BaseWidget} from '@int/geotoolkit/widgets/BaseWidget';
import {
  AfterViewInit,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Directive,
  HostBinding,
} from '@angular/core';

export interface IComponent {
  /**
   * A widget used in a component
   */
  widget: BaseWidget;
}

/**
 * Base abstract implementation for NG components.
 * Every derived component must have canvas with name "canvas" and div with name "canvasContainer"
 */
@Directive()
export abstract class AbstractComponent implements IComponent, OnDestroy, OnInit, AfterViewInit {

  // region private data members
  private _plot: Plot;
  // endregion

  @HostBinding('style.width')
  width = '100%';

  @HostBinding('style.height')
  height = '100%';

  // region ViewChildren
  @ViewChild('canvas', {static: true}) protected _canvasElementRef: ElementRef;
  @ViewChild('canvasContainer', {static: true}) protected _canvasContainer: ElementRef;
  // endregion

  // region Angular lifecycle methods
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this._plot && this._canvasContainer) {
      this._plot.setSize(
        this._canvasContainer.nativeElement.clientWidth,
        this._canvasContainer.nativeElement.clientHeight
      );
    }
  }

  /**
   * Creates Carnac plot for the component hosting
   */
  ngOnInit(): void {
    this._plot = new Plot({
      'canvaselement': this._canvasElementRef.nativeElement,
      'root': this.widget,
      'autorootbounds': true
    });
  }

  /**
   * Performs initial component resize
   */
  ngAfterViewInit(): void {
    this.onResize();
  }

  /**
   * Disposes previously allocated resources
   */
  ngOnDestroy(): void {
    this._plot.dispose(true);
  }

  // endregion

  // region abstract property widget: BaseWidget
  /**
   * Gets a widget used in the NG-2 component
   */
  public abstract get widget(): BaseWidget;

  // endregion

  // region property plot: Plot
  /**
   * Gets a plot that hosts the component
   */
  protected get plot(): Plot {
    return this._plot;
  }

  // endregion

  // region property options: any
  /**
   * Gets options set to the widget or undefined in case of widget is not defined
   */
  public get options(): any {
    if (this.widget && (<any>this.widget).getOptions) {
      return (<any>this.widget).getOptions();
    }
    return {};
  }

  /**
   * Sets options to the underlying widget
   * @param value options to be set to the widget
   */
  @Input()
  public set options(value: any) {
    if (this.widget && (<any>this.widget).setOptions) {
      (<any>this.widget).setOptions(value);
    }
  }

  // endregion

  // region public methods
  /**
   * Reset zoom to its original state
   */
  public resetZoom() {
    if (this.widget) {
      this.widget.scale(1, 1);
    }
  }

  /**
   * Enables a tool with the given name. If the tool was not found, the method returns false.
   * @param toolName a tool name to enable
   * @returns a boolean value indicating the tool state.
   */
  public enableTool(toolName: string): boolean {
    if (this.widget && this.widget.getToolByName(toolName)) {
      this.widget.getToolByName(toolName).setEnabled(true);
    }
    return this.isToolEnabled(toolName);
  }

  /**
   * Disables a tool with the given name. If the tool was not found, the method returns false.
   * @param toolName a tool name to disable
   * @returns a boolean value indicating the tool state.
   */
  public disableTool(toolName: string): boolean {
    if (this.widget && this.widget.getToolByName(toolName)) {
      this.widget.getToolByName(toolName).setEnabled(false);
    }
    return this.isToolEnabled(toolName);
  }


  /**
   * Returns a boolean value indicating whether a tool with the given name is enabled.
   * If the tool was not found, the method returns false.
   * @param toolName a name of a tool to check status.
   */
  public isToolEnabled(toolName: string): boolean {
    if (this.widget && this.widget.getToolByName(toolName)) {
      return this.widget.getToolByName(toolName).isEnabled();
    }
    return false;
  }

  /**
   * Performs component export to PDF document
   * @param options PDF export options (see geotoolkit documentation for details)
   */
  public exportToPdf(options?: any) {
    warn('Not implemented');
  }

  // endregion
}
