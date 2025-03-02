import { Pokeball } from "./pokeball";
import { Pokemon } from "./pokemon-class";

export class Trainer {
  #trainerName;
  belt;
  constructor(trainerName: string) {
    this.#trainerName = trainerName;
    // This is bad practice - fix it later
    const ball1 = new Pokeball();
    const ball2 = new Pokeball();
    const ball3 = new Pokeball();
    const ball4 = new Pokeball();
    const ball5 = new Pokeball();
    const ball6 = new Pokeball();
    this.belt = [ball1, ball2, ball3, ball4, ball5, ball6];
  }
  get trainerName() {
    return this.#trainerName;
  }

  catch(pokemon: Pokemon) {
    let isThrown = false;
    for (let ball of this.belt) {
      if (ball.isEmpty()) {
        ball.throw(pokemon);
        isThrown = true;
        break;
      }
    }
    if (isThrown == false) {
      console.log("You do not have any empty pokeballs!!");
    }
  }

  hasPokemon(pokemonName: string) {
    for (let ball of this.belt) {
      if (ball.storedPokemon?.name == pokemonName) {
        return true;
      }
      return false;
    }
  }

  getPokemon(pokemonName: string) {
    for (let ball of this.belt) {
      if (ball.storedPokemon?.name == pokemonName) {
        return ball.throw(undefined);
      }
    }
  }
}
