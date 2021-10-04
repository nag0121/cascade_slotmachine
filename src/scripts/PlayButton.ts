import { IBtnConfig } from "./interfaces/IBtnConfig";
import { Button } from "./prefabs/Button";
import { SlotMachine } from "./prefabs/SlotMachine";
import * as PIXI from "pixi.js";

export class PlayButton extends Button {

    protected isDisabled : boolean = false;
    protected isPressed : boolean = false;
    protected slotMachine! : SlotMachine     

    constructor(config : IBtnConfig, slotMachine : SlotMachine) {
        super(config);

        this.slotMachine = slotMachine;
    }


    protected onPressed() : void {
        if (this.isDisabled) {
            return;
        }
        super.onPressed();
        this.isPressed = true;
    }

    protected onPointerOut() : void {
        if (!this.isDisabled) super.onPointerOut();
        this.isPressed = false;
    }

    protected onReleased() : void {
        super.onReleased();
        if (this.isPressed) {
            this.isPressed = false;
            this.isDisabled = true;
            this.slotMachine.spinReel();
            setTimeout(() => { this.slotMachine.spinReel() }, 1000);
            setTimeout(() => { 
                this.isDisabled = false;
                this.onHover();
            }, 2500);

        }
    }

    protected onHover() : void {
        if (!this.isDisabled) super.onHover();
        this.isPressed = false;
    }
}