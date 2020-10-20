import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellLogNavigationComponent } from './welllog-navigation.component';

describe('WellLogNavigationComponent', () => {
  let component: WellLogNavigationComponent;
  let fixture: ComponentFixture<WellLogNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellLogNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellLogNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
