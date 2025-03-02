import { Pokemon } from "../pokemon-class";

export class Water extends Pokemon {
  constructor(name: string, hitPoints: number, attackDamage: number) {
    super(name, hitPoints, attackDamage, "water");
  }

  isEffectiveAgainst(pokemon: Pokemon) {
    return pokemon.type === "fire";
  }

  isWeakTo(pokemon: Pokemon) {
    return pokemon.type === "grass";
  }
}
