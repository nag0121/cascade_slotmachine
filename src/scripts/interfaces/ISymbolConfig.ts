import { IPosition } from "./IBtnConfig";

export interface ISymbolConfig {
    position : IPosition
    symbol : string
    symbolWidth : number
    symbolHeight : number
    totalSymbols : number
    textures? : Array<string>
}