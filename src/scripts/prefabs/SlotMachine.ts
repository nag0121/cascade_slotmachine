import { Container, Graphics } from "pixi.js";
import { reel_config } from "../configs/reel_config";
import { Reel } from "./Reel";
export class SlotMachine extends Container {
   
    private reels : Array<Reel> = [];
    private reelsXoffset : number = 7;
    private initialReelsXoffset : number = 6;
    private isSpinStarted : boolean = false;

    constructor() {
        super();
        this.setPosition();
        const mask = this.createBoundingBox();
        this.createReels();
        this.mask = mask;

        setTimeout(() => {
            // this.isSpinStarted = true;
            this.spinReel(0.02);
        }, 5000);
    }
    
    private createBoundingBox() : Graphics {
        const graphic = new Graphics();
        graphic.beginFill(0x00ff00)
        graphic.drawRect(0, 0, 1220, 708);
        graphic.endFill();
        this.addChild(graphic);
        return graphic;
    }

    private createReels() : void {
        const totalReels = reel_config.reelsCount;
        for (let i = 0; i < totalReels; i++) {
            const reelconfig= Object.assign({}, reel_config);
            reelconfig.position.x = ((reelconfig.reelWidth + this.reelsXoffset) * i) + this.initialReelsXoffset;
            const reel = new Reel(reelconfig);
            this.reels.push(reel);
            this.addChild(reel);
        }
    }

    private spinReel(time : number) : void {
        this.reels.forEach((reel, i) => {
            setTimeout(() => {
                reel.spinReel();
            }, 100 * i);
        })
    }

    private setPosition() {
        this.x = 220;
        this.y = 25;
    }

    update(delta : any) {
        this.reels.forEach(reel => reel.update(delta));
    }
}