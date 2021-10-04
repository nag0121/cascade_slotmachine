import * as PIXI from "pixi.js";
import { ISymbolConfig } from "../interfaces/ISymbolConfig";

export class Symbol extends PIXI.Container {

    public isSpinStarted : boolean = false;
    public elapsedTime : number = 0.01;
    private configData! : ISymbolConfig 
    private initialPosition : any;
    private symbolIndex : number;
    private spinState : number;
    private easeTargetPos : number = 678;
    private symbolTextures : Array<string> = [
    "assets/images/symbols/symbol_1.png",
    "assets/images/symbols/symbol_2.png",
    "assets/images/symbols/symbol_3.png",
    "assets/images/symbols/symbol_4.png",
    "assets/images/symbols/symbol_5.png",
    "assets/images/symbols/symbol_6.png",
    "assets/images/symbols/symbol_7.png",
    "assets/images/symbols/symbol_8.png"];

    constructor(config : ISymbolConfig, index : number) {
        super();
        this.configData = config;
        this.symbolIndex = index;
        this.spinState = 0;
        this.x = this.configData.position.x;
        this.y = this.configData.position.y;
        this.initialPosition = {x : this.x, y : this.y};
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

    private spin() {
        if (this.spinState == 0) {
            this.stateOneSpin();
        } else if (this.spinState == 1) {
            this.stateTwoSpin();
        }
    }

    private stateOneSpin() {
        if (this.y - this.initialPosition.y >= this.easeTargetPos) {
            this.isSpinStarted = false;
            this.y = this.initialPosition.y - this.easeTargetPos;
            this.spinState++;
            return;
        }
        this.y = Math.floor(this.y + (this.easeTargetPos) * this.elapsedTime);
    }

    private stateTwoSpin() {
        if (this.y >= this.initialPosition.y) {
            this.isSpinStarted = false;
            this.y = this.initialPosition.y;
            this.spinState = 0;
            return;
        }
        this.y = Math.floor(this.y + (this.easeTargetPos) * this.elapsedTime);
    }

    public update(time : number) {
        if (!this.isSpinStarted) return;
        this.spin();
    }
}