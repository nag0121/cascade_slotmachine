import { IReelConfig } from "../interfaces/IReelConfig";
import * as PIXI from "pixi.js";
import { Symbol } from "./Symbol";
import { SlotMachine } from "./SlotMachine";
import { sound } from "@pixi/sound";

export class Reel extends PIXI.Container {

    public isSpinStarted : boolean = false;
    public configData! : IReelConfig 
    public symbols : Array<Symbol> = [];
    private symbolYoffset : number = 0;
    private reelIndex! : number
    private slotMachine! : SlotMachine
    public isReelStopped : boolean = false;

    constructor(config : IReelConfig, reelIndex : number, slotMachine? : SlotMachine) {
        super();
        this.configData = config;
        this.reelIndex = reelIndex;
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
            symbolConfig.position.y = ((symbolConfig.symbolHeight + this.symbolYoffset) * i);
            const symbol = new Symbol(symbolConfig, i, this);
            this.symbols.push(symbol);
            this.addChild(symbol);
        }
    }

    private setPosition() {
        this.position.x = this.configData.position.x;
        this.position.y = this.configData.position.y;
    }

    public spinReel() : void {
        this.isReelStopped = false;
        this.symbols.forEach((symbol, index) => {
            setTimeout(()=>{
                symbol.isSpinStarted = true;
                symbol.elapsedTime = (this.symbols.length - index) * 0.06;
            }, (this.symbols.length - index) * 100); 
        });
    }

    public reelStopped () {
        if (!this.isReelStopped) {
            this.isReelStopped = true;
            sound.play(`reel${this.reelIndex + 1}`)
        }
    }

    public update(deltaTime : number){
        this.symbols.forEach(symbol => symbol.update(deltaTime));
    }
}