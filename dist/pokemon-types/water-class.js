"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Water = void 0;
const pokemon_class_1 = require("../pokemon-class");
class Water extends pokemon_class_1.Pokemon {
    constructor(name, hitPoints, attackDamage) {
        super(name, hitPoints, attackDamage, "water");
    }
    isEffectiveAgainst(pokemon) {
        return pokemon.type === "fire";
    }
    isWeakTo(pokemon) {
        return pokemon.type === "grass";
    }
}
exports.Water = Water;
