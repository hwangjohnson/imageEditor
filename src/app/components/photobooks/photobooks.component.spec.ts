import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotobooksComponent } from './photobooks.component';

describe('PhotobooksComponent', () => {
  let component: PhotobooksComponent;
  let fixture: ComponentFixture<PhotobooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotobooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotobooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
