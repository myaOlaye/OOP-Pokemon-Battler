import { Fire } from "../pokemon-types/fire-class";

export class Charmander extends Fire {
  constructor() {
    super("Charmander", 44, 17);
    this.move = "ember";
  }
}
