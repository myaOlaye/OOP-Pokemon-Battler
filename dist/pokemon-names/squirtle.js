"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squirtle = void 0;
const water_class_1 = require("../pokemon-types/water-class");
class Squirtle extends water_class_1.Water {
    constructor() {
        super("Squirtle", 44, 16);
        this.move = "water gun";
    }
}
exports.Squirtle = Squirtle;
