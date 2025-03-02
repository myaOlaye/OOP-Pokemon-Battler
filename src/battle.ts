import { Pokemon } from "./pokemon-class";
import { Trainer } from "./trainer";

export class Battle {
  trainer1: Trainer;
  trainer1sPokemon: Pokemon;
  trainer2: Trainer;
  trainer2sPokemon: Pokemon;

  constructor(
    trainer1: Trainer,
    trainer1sPokemonName: string,
    trainer2: Trainer,
    trainer2sPokemonName: string
  ) {
    this.trainer1 = trainer1;
    this.trainer1sPokemon = trainer1.getPokemon(trainer1sPokemonName)!; // Assert that Pokemon is not null - could be problematic - error arises with the throw methd in pokeball as it returns undefined for 3 of the cases
    this.trainer2 = trainer2;
    this.trainer2sPokemon = trainer2.getPokemon(trainer2sPokemonName)!; // Assert that Pokemon is not null;
  }

  fight(attackingPokemon: Pokemon, defendingPokemon: Pokemon): string {
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
    } else {
      return this.fight(defendingPokemon, attackingPokemon);
    }
  }
}
