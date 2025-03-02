"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battle = void 0;
class Battle {
    constructor(trainer1, trainer1sPokemonName, trainer2, trainer2sPokemonName) {
        this.trainer1 = trainer1;
        this.trainer1sPokemon = trainer1.getPokemon(trainer1sPokemonName); // Assert that Pokemon is not null - could be problematic - error arises with the throw methd in pokeball as it returns undefined for 3 of the cases
        this.trainer2 = trainer2;
        this.trainer2sPokemon = trainer2.getPokemon(trainer2sPokemonName); // Assert that Pokemon is not null;
    }
    fight(attackingPokemon, defendingPokemon) {
        let movePower = attackingPokemon.useMove();
        if (defendingPokemon.isWeakTo(attackingPokemon)) {
            movePower = movePower * 1.25;
        }
        if (defendingPokemon.isEffectiveAgainst(attackingPokemon)) {
            movePower = movePower * 0.75;
        }
        defendingPokemon.takeDamage(movePower);
        console.log("Attacker health ", attackingPokemon.hitPoints);
        console.log("Defender health ", defendingPokemon.hitPoints);
        if (defendingPokemon.hasFainted()) {
            console.log(attackingPokemon.name, "wins!");
            return attackingPokemon.name + " wins!";
        }
        else {
            return this.fight(defendingPokemon, attackingPokemon);
        }
    }
}
exports.Battle = Battle;
