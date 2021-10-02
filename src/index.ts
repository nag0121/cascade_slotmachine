import { Application, Loader, Sprite } from "pixi.js";
import { Tween } from "@tweenjs/tween.js";
import { SlotMachine } from "./scripts/prefabs/SlotMachine";
import { Button } from "./scripts/prefabs/Button";
export class Game extends Application
{
    private slotMachine! : SlotMachine
    constructor(){
        super({
            width : 1620,
            height : 920,
            antialias : true,
            autoDensity : true,
            backgroundColor : 0x000000,
        })

        this.loadAssets();

        window.addEventListener("resize", ()=>{
            this.screen.width = window.innerWidth;
            this.screen.height = window.innerHeight;
        })

        this.ticker.add(this.update.bind(this));
    }

    update(delta : any) {
        this.slotMachine?.update(delta);
    }

    private loadAssets() : void 
    {
        Loader.shared.add([
            "assets/images/symbols/symbol_1.png",
            "assets/images/symbols/symbol_2.png",
            "assets/images/symbols/symbol_3.png",
            "assets/images/symbols/symbol_4.png",
            "assets/images/symbols/symbol_5.png",
            "assets/images/symbols/symbol_6.png",
            "assets/images/symbols/symbol_7.png",
            "assets/images/symbols/symbol_8.png",
            "assets/images/ui/btn_spin_normal.png",
            "assets/images/ui/btn_spin_hover.png",
            "assets/images/ui/btn_spin_disabled.png",
            "assets/images/ui/btn_spin_pressed.png"
        ])
        .load(this.onAssetsLoaded.bind(this))
    }

    private onAssetsLoaded() : void
    {
        console.log("assets are loaded");

        this.slotMachine = this.createSlotMachineView();
        const playButton = this.createPlayButton();

        this.stage.addChild(this.slotMachine, playButton);
    }

    private createSlotMachineView() : SlotMachine {
        const slotMachine = new SlotMachine();
        return slotMachine;
    }

    private createPlayButton() : Button {
        const playButton = new Button({
            position : {
                x : 810,
                y : 850
            },
            spriteConfig : {
                textures : {
                    normalFrame : "assets/images/ui/btn_spin_normal.png",
                    hoverFrame : "assets/images/ui/btn_spin_hover.png",
                    clickedFrame : "assets/images/ui/btn_spin_pressed.png",
                    disabledFrame : "assets/images/ui/btn_spin_disabled.png"
                }
            },
            labelConfig : {
                string : "Play",
                position : {
                    x : 5,
                    y : -32
                }
            }
        });

        return playButton;
    }

}

document.body.appendChild(new Game().view);