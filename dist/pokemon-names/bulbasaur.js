"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bulbasaur = void 0;
const grass_class_1 = require("../pokemon-types/grass-class");
class Bulbasaur extends grass_class_1.Grass {
    constructor() {
        super("Bulbasaur", 45, 16);
        this.move = "vine whip";
    }
}
exports.Bulbasaur = Bulbasaur;
