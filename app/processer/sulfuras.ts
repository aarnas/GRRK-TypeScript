import { Basic } from "./basic";

export class Sulfuras extends Basic {
    constructor(name: string, quality: number, sellIn: number) {
        super(name, 80, sellIn);
    }

    changeQualityOperator() {
        this.qualityOperator = 0;
    }

    checkQuality() {
        //Empty
    }
}