import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCoversComponent } from './mobile-covers.component';

describe('MobileCoversComponent', () => {
  let component: MobileCoversComponent;
  let fixture: ComponentFixture<MobileCoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCoversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
