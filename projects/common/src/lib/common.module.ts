import {NgModule} from '@angular/core';
import {ToolCrosshairDirective} from './directives/tool-crosshair.directive';
import {ToolRubberzoomDirective} from './directives/tool-rubberzoom.directive';
import {AbstractComponent} from './components/abstract.component';

@NgModule({
  declarations: [ToolCrosshairDirective, ToolRubberzoomDirective],
  exports: [ToolCrosshairDirective, ToolRubberzoomDirective]
})
export class CommonModule {
}

export class EventArgs<TSender> {
  constructor(public readonly sender: TSender) {
  }
}

export class ValueChangedEventArgs<TSender, TValue> extends EventArgs<TSender> {
  constructor (sender: TSender, public readonly oldValue: TValue, public readonly newValue: TValue) {
    super(sender);
  }
}

export class ScaleChangedEventArgs extends ValueChangedEventArgs<AbstractComponent, {'scaleX': number, 'scaleY': number}> {
  constructor(sender: AbstractComponent, oldValue: {'scaleX': number, 'scaleY': number}, newValue: {'scaleX': number, 'scaleY': number}) {
    super(sender, oldValue, newValue);
  }
}
