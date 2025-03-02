"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fire = void 0;
const pokemon_class_1 = require("../pokemon-class");
class Fire extends pokemon_class_1.Pokemon {
    constructor(name, hitPoints, attackDamage) {
        super(name, hitPoints, attackDamage, "fire");
    }
    isEffectiveAgainst(pokemon) {
        return pokemon.type === "grass";
    }
    isWeakTo(pokemon) {
        return pokemon.type === "water";
    }
}
exports.Fire = Fire;
