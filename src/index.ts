import * as PIXI from "pixi.js";
import { SlotMachine } from "./scripts/prefabs/SlotMachine";
import { Button } from "./scripts/prefabs/Button";
import { PlayButton } from "./scripts/PlayButton";
import { Sound, sound } from "@pixi/sound";
export class Game extends PIXI.Application
{
    private slotMachine! : SlotMachine
    constructor(){
        super({
            width : 1620,
            height : 920,
            antialias : true,
            autoDensity : true,
            backgroundColor : 0x00ffff,
        })

        this.loadAssets();

        this.ticker.add(this.update.bind(this));
    }

    update(delta : any) {
        this.slotMachine?.update(delta);
    }

    private loadAssets() : void 
    {
        PIXI.Loader.shared.add([
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
            "assets/images/ui/btn_spin_pressed.png",
        ])
        .load(this.onAssetsLoaded.bind(this))
    }

    private onAssetsLoaded() : void
    {
        console.log("assets are loaded");
        this.loadSounds();
        this.slotMachine = this.createSlotMachineView();
        const playButton = this.createPlayButton();
        
        this.stage.addChild(this.slotMachine, playButton);
    }

    private createSlotMachineView() : SlotMachine {
        const slotMachine = new SlotMachine();
        return slotMachine;
    }

    private createPlayButton() : Button {
        const playButton = new PlayButton({
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
        }, this.slotMachine);

        return playButton;
    }

    private loadSounds() {
        sound.add("reel1", "assets/sounds/Reel_Stop_1.mp3");
        sound.add("reel2", "assets/sounds/Reel_Stop_2.mp3");
        sound.add("reel3", "assets/sounds/Reel_Stop_3.mp3");
        sound.add("reel4", "assets/sounds/Reel_Stop_4.mp3");
        sound.add("reel5", "assets/sounds/Reel_Stop_5.mp3");
        sound.add("play", "assets/sounds/Start_Button.mp3");
    }

}

document.body.appendChild(new Game().view);