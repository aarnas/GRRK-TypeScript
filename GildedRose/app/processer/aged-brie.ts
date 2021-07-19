import { Basic } from "./basic";

export class AgedBrie extends Basic {
    constructor(name: string, quality: number, sellIn: number) {
        super(name, quality, sellIn);
    }

    changeQualityOperator() {
        if (this.sellIn <= 0) {
            this.qualityOperator = 2;
        } else {
            this.qualityOperator = 1;
        }
    }

}