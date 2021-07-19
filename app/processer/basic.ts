import { Item } from "../gilded-rose";

export class Basic {
    quality: number;
    sellIn: number;
    name: string;

    sellInOperator = -1;
    qualityOperator = -1;
    constructor(name: string, quality: number, sellIn: number) {
        this.name = name;
        this.quality = quality;
        this.sellIn = sellIn;
    }

    process(): Item | boolean {
        if (!this.isValid()) {
            return false;
        }
        this.changeQualityOperator();        
        this.quality = this.quality + this.qualityOperator;
        this.sellIn = this.sellIn + this.sellInOperator;
        this.checkQuality();
        return <Item>{
            name: this.name,
            quality: this.quality,
            sellIn: this.sellIn
        }
    }

    changeQualityOperator() {
        if (this.sellIn <= 0) {
            this.qualityOperator=-2;
        }
    }

    checkQuality() {
        if (this.quality > 50) {
            this.quality = 50;
        }
        if (this.quality < 0) {
            this.quality = 0;
        }
    }

    isValid(): boolean {
        return typeof this.quality === 'number' && typeof this.sellIn === 'number' && Boolean(this.name);
    }
}