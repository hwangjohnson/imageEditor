import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayTextsComponent } from './overlay-texts.component';

describe('OverlayTextsComponent', () => {
  let component: OverlayTextsComponent;
  let fixture: ComponentFixture<OverlayTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayTextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
