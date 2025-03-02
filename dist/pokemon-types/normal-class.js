"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Normal = void 0;
const pokemon_class_1 = require("../pokemon-class");
class Normal extends pokemon_class_1.Pokemon {
    constructor(name, hitPoints, attackDamage) {
        super(name, hitPoints, attackDamage, "normal");
    }
    isEffectiveAgainst(pokemon) {
        return false;
    }
    isWeakTo(pokemon) {
        return false;
    }
}
exports.Normal = Normal;
