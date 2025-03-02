import { Pokemon } from "../pokemon-class";

export class Fire extends Pokemon {
  constructor(name: string, hitPoints: number, attackDamage: number) {
    super(name, hitPoints, attackDamage, "fire");
  }

  isEffectiveAgainst(pokemon: Pokemon) {
    return pokemon.type === "grass";
  }

  isWeakTo(pokemon: Pokemon) {
    return pokemon.type === "water";
  }
}
