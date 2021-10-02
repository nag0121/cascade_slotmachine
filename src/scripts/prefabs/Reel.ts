import { IReelConfig } from "../interfaces/IReelConfig";
import * as PIXI from "pixi.js";
import { Symbol } from "./Symbol";

export class Reel extends PIXI.Container {

    private configData! : IReelConfig 
    private symbols! : Array<Symbol> 
    private symbolYoffset : number = 2;
    constructor(config : IReelConfig) {
        super();
        this.configData = config;
        this.setPosition();
        this.createBoundingBox();
        this.createSymbols()
    }

    private createBoundingBox() : void {
        const graphic = new PIXI.Graphics();
        graphic.beginFill(0x00ff00)
        graphic.drawRect(0, 0, this.configData.reelWidth, this.configData.reelHeight);
        graphic.endFill();
        this.addChild(graphic);
    }

    private createSymbols() : void {
        const symbolsCount = this.configData.symbolConfig.totalSymbols;
        for (let i = 0; i < symbolsCount; i++) {
            const symbolConfig = Object.assign({}, this.configData.symbolConfig);
            symbolConfig.position.y = (symbolConfig.symbolHeight + this.symbolYoffset) * i;
            const symbol = new Symbol(symbolConfig);
            this.symbols?.push(symbol);
            this.addChild(symbol);
        }
    }

    private setPosition() {
        this.position.x = this.configData.position.x;
        this.position.y = this.configData.position.y;
    }
}