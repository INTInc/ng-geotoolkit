import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiwellComponent } from './multiwell.component';

describe('MultiwellComponent', () => {
  let component: MultiwellComponent;
  let fixture: ComponentFixture<MultiwellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiwellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiwellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change scale on zoom', () => {
    spyOn(component.scaleChanged, 'emit');
    spyOn(component.transformationChanged, 'emit');

    component.zoomIn();

    expect(component.scaleChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.transformationChanged.emit).toHaveBeenCalledTimes(1);

    component.zoomOut();

    expect(component.scaleChanged.emit).toHaveBeenCalledTimes(2);
    expect(component.transformationChanged.emit).toHaveBeenCalledTimes(2);
  });
});
