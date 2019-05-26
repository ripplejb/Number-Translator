import { TestBed } from '@angular/core/testing';

import { MoneyTranslatorService } from './money-translator.service';

describe('MoneyTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoneyTranslatorService = TestBed.get(MoneyTranslatorService);
    expect(service).toBeTruthy();
  });
});
