import { Grass } from "../pokemon-types/grass-class";

export class Bulbasaur extends Grass {
  constructor() {
    super("Bulbasaur", 45, 16);
    this.move = "vine whip";
  }
}
