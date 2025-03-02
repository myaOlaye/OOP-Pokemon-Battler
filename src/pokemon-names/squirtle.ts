import { Water } from "../pokemon-types/water-class";

export class Squirtle extends Water {
  constructor() {
    super("Squirtle", 44, 16);
    this.move = "water gun";
  }
}
