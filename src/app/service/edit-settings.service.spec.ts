import { TestBed, inject } from '@angular/core/testing';

import { EditSettingsService } from './edit-settings.service';

describe('EditSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditSettingsService]
    });
  });

  it('should be created', inject([EditSettingsService], (service: EditSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
