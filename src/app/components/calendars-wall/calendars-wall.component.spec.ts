import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarsWallComponent } from './calendars-wall.component';

describe('CalendarsWallComponent', () => {
  let component: CalendarsWallComponent;
  let fixture: ComponentFixture<CalendarsWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarsWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarsWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
