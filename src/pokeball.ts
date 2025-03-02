import { Pokemon } from "./pokemon-class";

export class Pokeball {
  storedPokemon: Pokemon | null;

  constructor() {
    this.storedPokemon = null; //initially no stored pokemon
  }
  throw(pokemon: Pokemon | undefined): Pokemon | undefined {
    // Catch - no stored pokemon and pokemon to catch
    if (!this.storedPokemon && pokemon) {
      this.storedPokemon = pokemon;
      console.log("You caught " + pokemon.name);
      // Throw - stored pokemon and no pokemon to catch
    } else if (this.storedPokemon && !pokemon) {
      console.log("GO " + this.storedPokemon.name + "!!!");
      //this.storedPokemon = undefined - DO WE LET THE POKEMON GO AFTER WE THROW?
      return this.storedPokemon;
      // Unsuccessful Catch - stored pokemon and pokemon to catch
    } else if (this.storedPokemon && pokemon) {
      console.log("The pokeball is full, you can't catch another pokemon");
      // Unsuccessful Throw - no stored pokemon and no pokemon to catch
    } else if (!this.storedPokemon && !pokemon) {
      console.log("There is no Pokemon to throw");
    }
  }
  isEmpty() {
    if (this.storedPokemon) {
      return false;
    } else return true;
  }

  contains() {
    if (this.isEmpty()) {
      return "empty ...";
    } else return this.storedPokemon?.name;
  }
}
