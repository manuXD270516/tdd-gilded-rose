import { TestBed } from '@angular/core/testing'
import { Item } from './gilded-rose.types'

import { UpdateService } from './update.service'

describe('UpdateService', () => {
  let service: UpdateService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(UpdateService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  });

  describe('Normal items', () => {
    it('when Q:10, expected Q:9', () => {
      const normalItem: Item = {
        type: 'normal',
        quality: 10,
        sellIn: 5,
      };
      const result = service.update(normalItem)
      expect(9).toEqual(result.quality)
      expect(4).toEqual(result.sellIn)
    });

    it('when Q: 5, Q: 4', () => {
      const normalItem: Item = {
        type: 'normal',
        quality: 5,
        sellIn: 2,
      };
      const result = service.update(normalItem);
      expect(4).toEqual(result.quality);
      expect(1).toEqual(result.sellIn);
    });

    it('when Q: 0, Q: 0', () => {
      const normalItem: Item = {
        type: 'normal',
        quality: 0,
        sellIn: 0,
      };
      const result = service.update(normalItem);
      expect(0).toEqual(result.quality);
      expect(-1).toEqual(result.sellIn);
    });
  });

  describe('Aged Brie', () => {
    it('when QI: 10, SII: 5, QO: 11, SIO: 4', () => {
      const agedBrieItem: Item = {
        type: 'agedBrie',
        quality: 10,
        sellIn: 5,
      };
      const result = service.update(agedBrieItem);
      expect(11).toEqual(result.quality);
      expect(4).toEqual(result.sellIn);
    });

    it('when QI: 20, SII:0, QO: 21, SIO: -1', () => {
      const agedBrieItem: Item = {
        type: 'agedBrie',
        quality: 20,
        sellIn: 0,
      };
      const result = service.update(agedBrieItem);
      expect(21).toEqual(result.quality);
      expect(-1).toEqual(result.sellIn);
    });

    it('when QI: 21, SII:-1, QO: 23, SIO: -2', () => {
      const agedBrieItem: Item = {
        type: 'agedBrie',
        quality: 21,
        sellIn: -1,
      };
      const result = service.update(agedBrieItem);
      expect(23).toEqual(result.quality);
      expect(-2).toEqual(result.sellIn);
    });

    it('when QI: 50, SII:-1, QO: 50, SIO: -2', () => {
      const agedBrieItem: Item = {
        type: 'agedBrie',
        quality: 50,
        sellIn: -1,
      };
      const result = service.update(agedBrieItem);
      expect(50).toEqual(result.quality);
      expect(-2).toEqual(result.sellIn);
    });
  });

  describe('Sulfururas', () => {
    it('when Q: 10, expected Q: 10', () => {
      const sulfurItem: Item = {
        type: 'sulfuras',
        quality: 10,
        sellIn: 5,
      };
      const result = service.update(sulfurItem);
      expect(10).toEqual(result.quality);
      expect(5).toEqual(result.sellIn);
    });

    it('when Q: 50, expected Q: 50', () => {
      const sulfurItem: Item = {
        type: 'sulfuras',
        quality: 50,
        sellIn: 15,
      };
      const result = service.update(sulfurItem);
      expect(50).toEqual(result.quality);
      expect(15).toEqual(result.sellIn);
    });
  });

  describe('Conjured', () => {
    it('when Q: 10, expected Q: 8', () => {
      const sulfurItem: Item = {
        type: 'conjured',
        quality: 10,
        sellIn: 5,
      };
      const result = service.update(sulfurItem);
      expect(8).toEqual(result.quality);
      expect(4).toEqual(result.sellIn);
    });

    it('when Q: 50, expected Q: 48', () => {
      const sulfurItem: Item = {
        type: 'conjured',
        quality: 50,
        sellIn: 15,
      };
      const result = service.update(sulfurItem);
      expect(48).toEqual(result.quality);
      expect(14).toEqual(result.sellIn);
    });

    it('when Q: 0, expected Q: 0', () => {
      const sulfurItem: Item = {
        type: 'conjured',
        quality: 0,
        sellIn: 0,
      };
      const result = service.update(sulfurItem);
      expect(0).toEqual(result.quality);
      expect(-1).toEqual(result.sellIn);
    });

    it('when Q: 1, expected Q: 0', () => {
      const sulfurItem: Item = {
        type: 'conjured',
        quality: 1,
        sellIn: 2,
      };
      const result = service.update(sulfurItem);
      expect(0).toEqual(result.quality);
      expect(1).toEqual(result.sellIn);
    });
  });
});
