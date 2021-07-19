import { Basic } from "./basic";

export class Backstage extends Basic {
    constructor(name: string, quality: number, sellIn: number) {
        super(name, quality, sellIn);
    }

    changeQualityOperator() {
        if (this.sellIn <= 0) {
            this.qualityOperator = 0;
            this.quality = 0;
        } else if (this.sellIn <= 5) {
            this.qualityOperator = 3;
        } else if (this.sellIn <= 10) {
            this.qualityOperator = 2;
        } else {
            this.qualityOperator = 1;
        }
    }
}