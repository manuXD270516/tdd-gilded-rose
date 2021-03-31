import { Injectable } from '@angular/core'
import { Item, UpdateStrategy, ItemTypes } from './gilded-rose.types'

class NormalUpdateStrategy implements UpdateStrategy {
  static readonly ITEM_DEGRADE_QUALITY = 1;
  static readonly SELL_IN_ENDED = 0;
  static readonly VOIDED_QUALITY = 0;

  update(item: Item): Item {
    const newItem = { ...item };

    if (newItem.sellIn > NormalUpdateStrategy.SELL_IN_ENDED){
      newItem.quality = newItem.quality - NormalUpdateStrategy.ITEM_DEGRADE_QUALITY;
    } else {
      newItem.quality = newItem.quality - NormalUpdateStrategy.ITEM_DEGRADE_QUALITY * 2;
    }

    if (newItem.quality < NormalUpdateStrategy.VOIDED_QUALITY) {
      newItem.quality = NormalUpdateStrategy.VOIDED_QUALITY;
    }

    newItem.sellIn -= 1;

    return newItem;
  }
}

class AgedBrieUpdateStrategy implements UpdateStrategy {
  static readonly MAX_ITEM_QUALITY = 50;
  static readonly ITEM_UPGRADE_QUALITY = 1;
  static readonly SELL_IN_ENDED = 0;

  update(item: Item): Item {
    const newItem = { ...item };

    if (newItem.sellIn < AgedBrieUpdateStrategy.SELL_IN_ENDED){
      newItem.quality = newItem.quality + AgedBrieUpdateStrategy.ITEM_UPGRADE_QUALITY * 2;
    }

    if (newItem.quality < AgedBrieUpdateStrategy.MAX_ITEM_QUALITY) {
      newItem.quality = newItem.quality + AgedBrieUpdateStrategy.ITEM_UPGRADE_QUALITY;
    }

    newItem.sellIn -= 1;

    return newItem;
  }
}

class ConjuredUpdateStrategy implements UpdateStrategy {
  static readonly ITEM_DEGRADE_QUALITY = 2;
  static readonly SELL_IN_ENDED = 0;
  static readonly VOIDED_QUALITY = 0;

  update(item: Item): Item {
    const newItem = { ...item };

    if (newItem.quality > ConjuredUpdateStrategy.SELL_IN_ENDED){
      newItem.quality = newItem.quality - ConjuredUpdateStrategy.ITEM_DEGRADE_QUALITY;
    } else {
      newItem.quality = newItem.quality - ConjuredUpdateStrategy.ITEM_DEGRADE_QUALITY * 2;
    }

    if (newItem.quality < ConjuredUpdateStrategy.VOIDED_QUALITY) {
      newItem.quality = ConjuredUpdateStrategy.VOIDED_QUALITY;
    }

    newItem.sellIn -= 1;

    return newItem;
  }
}

class SulfurasUpdateStrategy implements UpdateStrategy {
  update(item: Item): Item {
    const newItem = { ...item };
    // newItem.sellIn -= 1;
    return newItem;
  }
}

class BackstagePassesUpdateStrategy implements UpdateStrategy {
  static readonly MAX_ITEM_QUALITY = 50;
  static readonly NORMAL_ITEM_UPGRADE_QUALITY = 1;
  static readonly FIRST_GOAL_ITEM_UPGRADE_QUALITY = 2;
  static readonly DAYS_TO_FIRST_GOAL = 10;
  static readonly SECOND_GOAL_UPGRADE_QUALITY = 3;
  static readonly DAYS_TO_SECOND_GOAL = 5;
  static readonly VOIDED_QUALITY = 0;
  static readonly SELL_IN_ENDED = 0;

  private static calculateItemQualityUpgrade(remainingDays: number): number {
    if(remainingDays <= BackstagePassesUpdateStrategy.DAYS_TO_SECOND_GOAL) {
      return BackstagePassesUpdateStrategy.SECOND_GOAL_UPGRADE_QUALITY;
    } else if (remainingDays <= BackstagePassesUpdateStrategy.DAYS_TO_FIRST_GOAL) {
      return BackstagePassesUpdateStrategy.FIRST_GOAL_ITEM_UPGRADE_QUALITY;
    } else {
      return BackstagePassesUpdateStrategy.NORMAL_ITEM_UPGRADE_QUALITY;
    }
  }

  update(item: Item): Item {
    const newItem = { ...item };

    if(newItem.sellIn <= BackstagePassesUpdateStrategy.SELL_IN_ENDED){
      newItem.quality = BackstagePassesUpdateStrategy.VOIDED_QUALITY;
    } else if (newItem.quality < BackstagePassesUpdateStrategy.MAX_ITEM_QUALITY) {
     newItem.quality = newItem.quality + BackstagePassesUpdateStrategy.calculateItemQualityUpgrade(newItem.sellIn);
    }

    return newItem;
  }
}

const strategies = {
  normal: NormalUpdateStrategy,
  agedBrie: AgedBrieUpdateStrategy,
  conjured: ConjuredUpdateStrategy,
  sulfuras: SulfurasUpdateStrategy,
  backstagePasses: BackstagePassesUpdateStrategy,
};

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor() {}

  update(item: Item): Item {
    const strategy = strategies[item.type];

    if (strategy == null) {
      throw new Error('Type item error');
    }

    return new strategy().update(item);
  }
}

