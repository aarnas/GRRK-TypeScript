import express from 'express';
import { Item, GildedRose } from '../GildedRose/app/gilded-rose';

const app = express();
const port = 3000;

const itemNames = ["+5 Dexterity Vest", "Aged Brie", "Elixir of the Mongoose", "Sulfuras, Hand of Ragnaros", "Backstage passes to a TAFKAL80ETC concert", "Conjured"]
const itemsMock: Item[] = [];

let gildedRose: GildedRose;

app.get(`/mock/:quantity`, (request, response) => {
    for (let i = 0; i < Number(request.params.quantity); i++) {
        const itemName = itemNames[Math.floor(Math.random() * itemNames.length)]
        const itemMock = (itemName !== "Sulfuras, Hand of Ragnaros") ?
            new Item(itemNames[Math.floor(Math.random() * itemNames.length)], Math.floor(Math.random() * 15), Math.floor(Math.random() * 50))
            : new Item("Sulfuras, Hand of Ragnaros", Math.floor(Math.random() * 15), 80);
        itemsMock.push(itemMock)
    }
    gildedRose = new GildedRose(itemsMock);
    response.status(200).jsonp(gildedRose)
})

app.get(`/update`, (request, response) => {
    gildedRose.updateQuality();
    response.status(200).jsonp(gildedRose);
})

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});