
export interface IBtnConfig {
    position : IPosition
    spriteConfig : ISpriteConfig
    labelConfig : ILabelConfig
    options? : object
}

export interface IPosition {
    x : number,
    y : number,
}

interface IBtnTextureConfig {
    normalFrame : string
    hoverFrame : string
    disabledFrame : string
    clickedFrame : string
}

interface ISpriteConfig {
    textures : IBtnTextureConfig
    position? : IPosition
}

interface ILabelConfig {
    string : string
    position? : IPosition
}