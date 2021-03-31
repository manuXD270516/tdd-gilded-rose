export type ItemTypes = 'normal' | 'agedBrie' | 'sulfuras' | 'backstagePasses' | 'conjured'

export type Item = {
  readonly type: ItemTypes
  readonly quality: number
  readonly sellIn: number
}

export interface UpdateStrategy {
  update(item: Item): Item
}
