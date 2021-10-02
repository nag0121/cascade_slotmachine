import { Container, Graphics } from "pixi.js";
import { reel_config } from "../configs/reel_config";
import { IReelConfig } from "../interfaces/IReelConfig";
import { Button } from "./Button";
import { Reel } from "./Reel";
export class SlotMachine extends Container {
   
    private reels : Array<Reel> | null = null;
    private reelsXoffset : number = 7;
    private initialReelsXoffset : number = 6;
    
    constructor() {
        super();
        this.x = 220;
        this.y = 25;
        this.createBoundingBox();
        this.createReels();
    }
    
    private createBoundingBox() : void {
        const graphic = new Graphics();
        graphic.beginFill(0x00ff00)
        graphic.drawRect(0, 0, 1220, 708);
        graphic.endFill();
        this.addChild(graphic);
    }

    private createReels() {
        const totalReels = reel_config.reelsCount;
        for (let i = 0; i < totalReels; i++) {
            const reelconfig= Object.assign({}, reel_config);
            reelconfig.position.x = ((reelconfig.reelWidth + this.reelsXoffset) * i) + this.initialReelsXoffset;
            const reel = new Reel(reelconfig);
            this.reels?.push(reel);
            this.addChild(reel);
        }
    }

    update(delta : any) {
        // console.log("delta =>", delta);
    }
}