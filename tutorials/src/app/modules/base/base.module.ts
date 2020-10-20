import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { DescriptionComponent } from './components/description/description.component';
import { SampleCodeComponent } from './components/sample-code/sample-code.component';
import { SampleComponent } from './components/sample/sample.component';
import { PageComponent } from './components/page/page.component';



@NgModule({
  declarations: [TitleComponent, DescriptionComponent, SampleCodeComponent, SampleComponent, PageComponent],
  exports: [TitleComponent, DescriptionComponent, SampleCodeComponent, SampleComponent, PageComponent],
  imports: [
    CommonModule
  ]
})
export class BaseModule { }
