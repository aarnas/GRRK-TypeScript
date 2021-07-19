import { Processer } from "./processer/processer";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name:string, sellIn:number, quality:number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: (Item[]) = []) {
        this.items = items;
    }

    updateQuality() {
        this.items = this.items.map(
            (item: Item) => (Processer.makeItem(item)).process()
        ).filter(Boolean)
            .map(i => <Item>i);
        return this.items;
    }
}
