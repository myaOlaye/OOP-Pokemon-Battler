import { Pokemon } from "../pokemon-class";

export class Grass extends Pokemon {
  constructor(name: string, hitPoints: number, attackDamage: number) {
    super(name, hitPoints, attackDamage, "grass");
  }

  isEffectiveAgainst(pokemon: Pokemon) {
    return pokemon.type === "water";
  }

  isWeakTo(pokemon: Pokemon) {
    return pokemon.type === "fire";
  }
}
