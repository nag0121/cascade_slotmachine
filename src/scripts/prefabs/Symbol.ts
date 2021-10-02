import * as PIXI from "pixi.js";
import { ISymbolConfig } from "../interfaces/ISymbolConfig";

export class Symbol extends PIXI.Container {

    private configData! : ISymbolConfig 
    private symbolTextures : Array<string> = [
    "assets/images/symbols/symbol_1.png",
    "assets/images/symbols/symbol_2.png",
    "assets/images/symbols/symbol_3.png",
    "assets/images/symbols/symbol_4.png",
    "assets/images/symbols/symbol_5.png",
    "assets/images/symbols/symbol_6.png",
    "assets/images/symbols/symbol_7.png",
    "assets/images/symbols/symbol_8.png",]

    constructor(config : ISymbolConfig) {
        super();
        this.configData = config;
        this.position.x = this.configData.position.x;
        this.position.y = this.configData.position.y;
        this.createBoundingBox();
        this.createSymbol();
    }

    private createBoundingBox() : void {
        const graphic = new PIXI.Graphics();
        graphic.beginFill(0x0000ff)
        graphic.drawRect(0, 0, this.configData.symbolWidth, this.configData.symbolHeight);
        graphic.endFill();
        this.addChild(graphic);
    }

    private createSymbol() {
        const symbolSprite = new PIXI.Sprite(PIXI.Loader.shared.resources[this.symbolTextures[Math.floor(Math.random() * 8)]].texture)
        this.addChild(symbolSprite);
    }
}