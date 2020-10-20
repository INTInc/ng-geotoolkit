import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeismicColors } from '@int/geotoolkit/seismic/util/SeismicColors';

import { SeismicComponent } from './seismic.component';

describe('SeismicComponent', () => {
  let component: SeismicComponent;
  let fixture: ComponentFixture<SeismicComponent>;

  const testColorMaps = {
    initial: SeismicColors.getDefault().createNamedColorMap('WhiteBlack'),
    expected: SeismicColors.getDefault().createNamedColorMap('Spectrum')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change color map', () => {
    component.colorMap = testColorMaps.initial;
    spyOn(component.colorMapChanged, 'emit');

    component.colorMap = testColorMaps.expected;

    expect(component.colorMap).toBe(testColorMaps.expected);
    expect(component.colorMapChanged.emit).toHaveBeenCalledTimes(1);
  });

  it('change transformation event emitted on zoom in', () => {
    spyOn(component.transformationChanged, 'emit');
    spyOn(component.scaleChanged, 'emit');

    component.zoomIn();

    expect(component.transformationChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.scaleChanged.emit).toHaveBeenCalledTimes(1);

    component.zoomOut();

    expect(component.transformationChanged.emit).toHaveBeenCalledTimes(2);
    expect(component.scaleChanged.emit).toHaveBeenCalledTimes(2);
  });
});
