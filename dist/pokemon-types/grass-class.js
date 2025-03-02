"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grass = void 0;
const pokemon_class_1 = require("../pokemon-class");
class Grass extends pokemon_class_1.Pokemon {
    constructor(name, hitPoints, attackDamage) {
        super(name, hitPoints, attackDamage, "grass");
    }
    isEffectiveAgainst(pokemon) {
        return pokemon.type === "water";
    }
    isWeakTo(pokemon) {
        return pokemon.type === "fire";
    }
}
exports.Grass = Grass;
