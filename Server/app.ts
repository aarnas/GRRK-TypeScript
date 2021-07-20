import express from 'express';
import async from "async";
import axios from 'axios';
import fs from 'fs';

import { Item, GildedRose } from '../GildedRose/app/gilded-rose';

const app = express();
const port = 3000;

const itemNames = ["+5 Dexterity Vest", "Aged Brie", "Elixir of the Mongoose", "Sulfuras, Hand of Ragnaros", "Backstage passes to a TAFKAL80ETC concert", "Conjured"]
const itemsMock: Item[] = [];

let gildedRose: GildedRose;

app.get(`/`, (request, response) => {
    response.status(200).jsonp(gildedRose);
})

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
    process.argv[2] && process.argv[3] && console.log(`${process.argv[3]} item(s) will be mocked and updated ${process.argv[2]} time(s)`)
    process.argv[2] && process.argv[3] && mockYesNoWtfWithUpdates(Number(process.argv[2]), Number(process.argv[3]))
});

async function mockYesNoWtfWithUpdates(updateTimes: number, mockAmount: number) {
    //there is no info about when to mock data, but this should be right
    await axios.get(`http://localhost:3000/mock/${mockAmount}`)

    doFetches(mockAmount);

    function doFetches(times: number) {
        const responses: any[] = []
        let positives = 0;

        async.times(times, fetchGET)

        async function fetchGET() {
            await axios.get('https://yesno.wtf/api').then(response => { responses.push(response.data) })
            afterFetch()
        }

        function afterFetch() {
            positives = responses.filter(r => r.answer === 'yes').length
            //it is reasonable to add Date in logs, to make it more useful
            const now = new Date()
            //could write to file less times, but this seems more reasonable and informative
            fs.appendFile("log.txt", `${now.toLocaleDateString()} ${now.toTimeString()} ${String(positives)}\n`, function (err) {
                if (err) return console.log(err);
            });
            if (positives > 0) doFetches(positives)
            else if (updateTimes > 0) fetchUpdate()
        }

        async function fetchUpdate() {
            await axios.get('http://localhost:3000/update')
            updateTimes--;
            doFetches(mockAmount)
        }
    }
}