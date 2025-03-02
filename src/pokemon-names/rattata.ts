import { Normal } from "../pokemon-types/normal-class";

export class Rattata extends Normal {
  constructor(hitPoints: number, attackDamage: number) {
    super("Rattata", hitPoints, attackDamage);
  }
}
