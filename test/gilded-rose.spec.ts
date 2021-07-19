import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Items', () => {
    const item = new Item('foo', 10, 10);
    const properties = Object.keys(item);
    const methods = Object.keys(Item.prototype);
    it('Have 3 properties', () => {
        expect(properties.length).to.equal(3);
    })

    it('Item contains property name', () => {
        expect(properties.filter(p => p === "name").length > 0);
    })

    it('Item contains property sellIn', () => {
        expect(properties.filter(p => p === "sellIn").length > 0);
    })

    it('Item contains property quality', () => {
        expect(properties.filter(p => p === "quality").length > 0);
    })

    it("Item contains no methods", () => {
        expect(methods.length).to.equal(0);
    })

    it('At the end of each day system lowers both values for every item', () => {
        const itemMock1 = [
            new Item('foo', 10, 10)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
        expect(items[0].sellIn).to.equal(9);
    });

    it('Once the sell by date has passed, Quality degrades twice as fast', () => {
        const initalNegativeSellIns = [0, -1, -2];
        initalNegativeSellIns.map(sellIn => {
            const itemMock1 = [
                new Item('foo1', sellIn, 10)
            ];
            const gildedRose = new GildedRose(itemMock1);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(10 - 1 - 1);
            expect(items[0].sellIn).to.equal(sellIn - 1);
        });
    });

    it('The Quality of an item is never negative', () => {
        const initalQuality = [1, 0 - 1];
        initalQuality.map(quality => {
            const itemMock1 = [
                new Item('foo1', 10, quality)
            ];
            const gildedRose = new GildedRose(itemMock1);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(0);
        })
    });

    it('The Quality of an item is never more than 50', () => {
        const initalQuality = [51, 52];
        initalQuality.map(quality => {
            const itemMock1 = [
                new Item('foo1', 10, quality)
            ];
            const gildedRose = new GildedRose(itemMock1);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(50);
        })
    });
})

describe('Aged Brie special case', () => {
    it('"Quality increases the older it gets', () => {
        const itemMock1 = [
            new Item('Aged Brie', 10, 1)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
    });

    it('Quality increases twice by date has passed', () => {
        const itemMock1 = [
            new Item('Aged Brie', 0, 5)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5 + 1 + 1);
    });
});

describe('Backstage special case', () => {
    it('Quality increases by 1 when there are more than 10 days', () => {
        const itemMock1 = [
            new Item('Backstage passes to a TAFKAL80ETC concert', 11, 40)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(41);
        expect(items[0].sellIn).to.equal(10);
    })

    it('Quality increases by 2 when there are 10 days or less', () => {
        const days = [10, 9, 8, 7, 6];
        days.map(day => {
            const itemMock1 = [
                new Item('Backstage passes to a TAFKAL80ETC concert', day, 40)
            ];
            const gildedRose = new GildedRose(itemMock1);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(40 + 1 + 1);
            expect(items[0].sellIn).to.equal(day - 1);
        })
    })

    it('Quality increases by 3 when there are 5 days or less', () => {
        const days = [5, 4, 3, 2, 1];
        days.map(day => {
            const itemMock1 = [
                new Item('Backstage passes to a TAFKAL80ETC concert', day, 40)
            ];
            const gildedRose = new GildedRose(itemMock1);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(40 + 1 + 1 + 1);
            expect(items[0].sellIn).to.equal(day - 1);
        })
    })

    it('Quality drops to 0 after the concert', () => {
        const itemMock1 = [
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    })
});

describe('Conjured', () => {
    it('Items degrade in Quality twice as fast as normal items', () => {
        const itemMock1 = [
            new Item('Conjured', 10, 10)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
        expect(items[0].sellIn).to.equal(9);
    })
})

describe('Sulfuras special case', () => {
    it('Quality never decreases', () => {
        const itemMock1 = [
            new Item('Sulfuras, Hand of Ragnaros', 10, 40)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });

    it('Its Quality is 80 and it never alters', () => {
        const itemMock1 = [
            new Item('Sulfuras, Hand of Ragnaros', 10, 80)
        ];
        const gildedRose = new GildedRose(itemMock1);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });
})
