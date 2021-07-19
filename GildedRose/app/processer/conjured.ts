import { Basic } from "./basic";

export class Conjured extends Basic {
    constructor(name: string, quality: number, sellIn: number) {
        super(name, quality, sellIn);
    }

    changeQualityOperator() {
        this.qualityOperator=-2;
    }
}