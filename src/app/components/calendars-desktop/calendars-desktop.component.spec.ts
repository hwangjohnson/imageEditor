import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarsDesktopComponent } from './calendars-desktop.component';

describe('CalendarsDesktopComponent', () => {
  let component: CalendarsDesktopComponent;
  let fixture: ComponentFixture<CalendarsDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarsDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
