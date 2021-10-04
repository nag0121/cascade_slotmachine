import * as PIXI from "pixi.js";
import { IBtnConfig, IPosition } from "../interfaces/IBtnConfig";

export class Button extends PIXI.Container 
{
    protected configData! : IBtnConfig 
    protected sprite! : PIXI.Sprite;
    protected label! : PIXI.Sprite;

    constructor(config : IBtnConfig)
    {
        super();
        this.configData = config;
        this.sprite = this.createSprite();
        this.label = this.createLabel();
        this.setPosition(this, this.configData.position)
        this.addChild(this.sprite, this.label);
        this.setButtonInteractive(true);
        this.addEventListeners();
    }

    private addEventListeners() : void {
        this.on("pointerdown", this.onPressed, this);
        this.on("pointerover", this.onHover, this);
        this.on("pointerup", this.onReleased, this);
        this.on("pointerout", this.onPointerOut, this);
    }

    private createSprite() : PIXI.Sprite 
    {
        const sprite = new PIXI.Sprite(PIXI.Loader.shared.resources[this.configData.spriteConfig.textures.normalFrame].texture);
        sprite.anchor.set(0.5);
        return sprite;    
    }
    
    private createLabel() : PIXI.Text 
    {
        const label = new PIXI.Text(this.configData.labelConfig.string, {fontSize : 40, fontWeight : "bold", fill : "#ffffff"});
        label.anchor.set(0.5);
        this.setPosition(label, this.configData.labelConfig.position)
        return label;    
    }

    private setPosition(obj : PIXI.Container | PIXI.Sprite | PIXI.Text, position? : IPosition) {
        if (position) {
            obj.x = position.x || 0;
            obj.y = position.y || 0;
        }
    }

    private setButtonInteractive(flag : boolean) {
        this.interactive = flag;
        this.buttonMode = flag;
    }

    protected onPressed() : void {
        console.log("pressed", this.name);
        this.sprite.texture = PIXI.Texture.from(this.configData.spriteConfig.textures.clickedFrame);
    }
    protected onPointerOut() : void {
        console.log("disabled", this.name);
        this.sprite.texture = PIXI.Texture.from(this.configData.spriteConfig.textures.normalFrame);
    }
    protected onReleased() : void {
        console.log("released", this.name);
        this.sprite.texture = PIXI.Texture.from(this.configData.spriteConfig.textures.disabledFrame);
    }
    protected onHover() : void {
        console.log("on hover", this.name);
        this.sprite.texture = PIXI.Texture.from(this.configData.spriteConfig.textures.hoverFrame);

    }
}