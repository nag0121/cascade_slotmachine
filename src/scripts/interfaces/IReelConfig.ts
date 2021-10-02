import { IPosition } from "./IBtnConfig";
import { ISymbolConfig } from "./ISymbolConfig";

export interface IReelConfig {
    symbolConfig : ISymbolConfig
    reelWidth : number
    reelHeight : number
    position : IPosition
    reelsCount : number
    opts? : object
}