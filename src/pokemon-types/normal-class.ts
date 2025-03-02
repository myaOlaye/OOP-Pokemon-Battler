import { Pokemon } from "../pokemon-class";

export class Normal extends Pokemon {
  constructor(name: string, hitPoints: number, attackDamage: number) {
    super(name, hitPoints, attackDamage, "normal");
  }

  isEffectiveAgainst(pokemon: Pokemon) {
    return false;
  }

  isWeakTo(pokemon: Pokemon) {
    return false;
  }
}
