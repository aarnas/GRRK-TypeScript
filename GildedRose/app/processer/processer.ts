import { Item } from "../gilded-rose";
import { AgedBrie } from "./aged-brie";
import { Backstage } from "./backstage";
import { Sulfuras } from "./sulfuras";
import { Conjured } from "./conjured";
import { Basic } from "./basic";

export class Processer {
    static makeItem(item: Item):Basic{
        if(item) {
            switch(item.name) {
                case 'Aged Brie':
                    return new AgedBrie(item.name, item.quality, item.sellIn);
                case 'Sulfuras, Hand of Ragnaros':
                    return new Sulfuras(item.name, item.quality, item.sellIn);
                case 'Backstage passes to a TAFKAL80ETC concert':
                    return new Backstage(item.name, item.quality, item.sellIn);
                case 'Conjured':
                return new Conjured(item.name, item.quality, item.sellIn);
                default:
                    return new Basic(item.name, item.quality, item.sellIn);
            }
        } else {
            return new Basic("", 0, 0);
        }
    }
}