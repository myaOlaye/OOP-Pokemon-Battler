const inquirer = require("inquirer");

const trainer1Questions = [
  {
    type: "input",
    name: "trainerName",
    message: "Trainer 1, What is your name?",
    default: "Ash",
  },
  {
    type: "list",
    name: "selectedPokemon",
    message: "Trainer 1, Which pokemon do you want to catch?",
    choices: ["Charmander", "Bulbasaur", "Squirtle", "Rattata"],
  },
];
const trainer2Questions = [
  {
    type: "input",
    name: "trainerName",
    message: "Trainer 2, What is your name?",
    default: "Ash",
  },
  {
    type: "list",
    name: "selectedPokemon",
    message: "Trainer 2, Which pokemon do you want to catch?",
    choices: ["Charmander", "Bulbasaur", "Squirtle", "Rattata"],
  },
];

const battleQuestions = [
  {
    type: "list",
    name: "chosenBattlePokemon1",
    message: "Trainer 1, Which pokemon do you want to fight with?",
    choices: [],
  },
  {
    type: "list",
    name: "chosenBattlePokemon2",
    message: "Trainer 2, Which pokemon do you want to fight with?",
    choices: [],
  },
];

function playGame() {
  let trainer1;
  let trainer2;
  inquirer
    .prompt(trainer1Questions)
    .then(function (trainer1Answers) {
      trainer1 = new Trainer(trainer1Answers.trainerName);
      let selectedPokemon;
      switch (trainer1Answers.selectedPokemon) {
        case "Charmander":
          selectedPokemon = new Charmander();
          break;
        case "Squirtle":
          selectedPokemon = new Squirtle();
          break;
        case "Bulbasaur":
          selectedPokemon = new Bulbasaur();
          break;
        case "Rattata":
          selectedPokemon = new Rattata(30, 10); // example stats
          break;
      }
      trainer1.catch(selectedPokemon);
      return inquirer.prompt(trainer2Questions);
    })
    .then(function (trainer2Answers) {
      trainer2 = new Trainer(trainer2Answers.trainerName);
      let selectedPokemon;
      switch (trainer2Answers.selectedPokemon) {
        case "Charmander":
          selectedPokemon = new Charmander();
          break;
        case "Squirtle":
          selectedPokemon = new Squirtle();
          break;
        case "Bulbasaur":
          selectedPokemon = new Bulbasaur();
          break;
        case "Rattata":
          selectedPokemon = new Rattata(30, 10); // example stats
          break;
      }
      trainer2.catch(selectedPokemon);

      const pokemonChoices1 = trainer1.belt
        .filter((ball) => !ball.isEmpty()) // Filter only filled Pokéballs
        .map((ball) => ball.storedPokemon.name); // Get Pokemon names

      const pokemonChoices2 = trainer2.belt
        .filter((ball) => !ball.isEmpty()) // Filter only filled Pokéballs
        .map((ball) => ball.storedPokemon.name); // Get Pokemon names

      battleQuestions[0].choices = pokemonChoices1;
      battleQuestions[1].choices = pokemonChoices2;

      return inquirer.prompt(battleQuestions);
    })
    .then(function (battleAnswers) {
      let battle = new Battle(
        trainer1,
        battleAnswers.chosenBattlePokemon1,
        trainer2,
        battleAnswers.chosenBattlePokemon2
      );

      return battle.fight(battle.trainer1sPokemon, battle.trainer2sPokemon);
    });
}

playGame();

//class PokemonGame {}

class Pokemon {
  name;
  #hitPoints;
  #attackDamage;
  #move;
  constructor(name, hitPoints, attackDamage) {
    this.name = name;
    this.#hitPoints = hitPoints;
    this.#attackDamage = attackDamage;
    this.#move = "tackle";
  }

  get hitPoints() {
    return this.#hitPoints;
  }
  get attackDamage() {
    return this.#attackDamage;
  }
  get move() {
    return this.#move;
  }

  set hitPoints(updatedHitPoint) {
    this.#hitPoints = updatedHitPoint;
  }
  set move(updatedMove) {
    this.#move = updatedMove;
  }

  takeDamage(amount) {
    this.hitPoints = this.hitPoints - amount;
  }
  useMove() {
    console.log(this.name, "used", this.move);
    return this.attackDamage;
  }
  hasFainted() {
    return this.hitPoints <= 0;
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "fire";
  }

  isEffectiveAgainst(pokemon) {
    return pokemon.type === "grass";
  }

  isWeakTo(pokemon) {
    return pokemon.type === "water";
  }
}
class Water extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "water";
  }

  isEffectiveAgainst(pokemon) {
    return pokemon.type === "fire";
  }

  isWeakTo(pokemon) {
    return pokemon.type === "grass";
  }
}
class Grass extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "grass";
  }

  isEffectiveAgainst(pokemon) {
    return pokemon.type === "water";
  }

  isWeakTo(pokemon) {
    return pokemon.type === "fire";
  }
}
class Normal extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.type = "normal";
  }

  isEffectiveAgainst(pokemon) {
    return false;
  }

  isWeakTo(pokemon) {
    return false;
  }
}

class Charmander extends Fire {
  constructor() {
    super("Charmander", 44, 17);
    this.move = "ember";
  }
}
class Squirtle extends Water {
  constructor() {
    super("Squirtle", 44, 16);
    this.move = "water gun";
  }
}
class Bulbasaur extends Grass {
  constructor() {
    super("Bulbasaur", 45, 16);
    this.move = "vine whip";
  }
}

class Rattata extends Normal {
  constructor(hitPoints, attackDamage) {
    super("Rattata", hitPoints, attackDamage);
  }
}

class Pokeball {
  constructor() {
    this.storedPokemon;
  }
  throw(pokemon) {
    // Successful catch
    if (!this.storedPokemon && pokemon) {
      this.storedPokemon = pokemon;
      console.log("You caught " + pokemon.name);
      // Successful throw
    } else if (this.storedPokemon && !pokemon) {
      console.log("GO " + this.storedPokemon.name + "!!!");
      //this.storedPokemon = undefined;
      return this.storedPokemon;
      // Unsuccessful catch
    } else if (this.storedPokemon && pokemon) {
      console.log("The pokeball is full, you can't catch another pokemon");
      // Unsuccessful throw
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
    } else return this.storedPokemon.name;
  }
}

class Trainer {
  #trainerName;
  constructor(trainerName) {
    this.#trainerName = trainerName;
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

  catch(pokemon) {
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

  getPokemon(nm) {
    //let foundPokemon;
    for (let ball of this.belt) {
      //console.log(ball)
      if (ball.storedPokemon.name == nm) {
        //foundPokemon = ball.storedPokemon
        return ball.throw();
      }
    }
  }
}

class Battle {
  constructor(trainer1, trainer1sPokemonName, trainer2, trainer2sPokemonName) {
    this.trainer1 = trainer1;
    this.trainer1sPokemon = trainer1.getPokemon(trainer1sPokemonName);
    this.trainer2 = trainer2;
    this.trainer2sPokemon = trainer2.getPokemon(trainer2sPokemonName);
  }

  fight(attackingPokemon, defendingPokemon) {
    let movePower = attackingPokemon.useMove();

    if (defendingPokemon.isWeakTo(attackingPokemon)) {
      movePower = movePower * 1.25;
    }

    if (defendingPokemon.isEffectiveAgainst(attackingPokemon)) {
      movePower = movePower * 0.75;
    }

    defendingPokemon.takeDamage(movePower);

    console.log("Attacher health ", attackingPokemon.hitPoints);
    console.log("Defender health ", defendingPokemon.hitPoints);

    if (defendingPokemon.hasFainted()) {
      //console.log("WHOOP")
      console.log(attackingPokemon.name, "wins!");
      return attackingPokemon.name + " wins!";
    } else {
      return this.fight(defendingPokemon, attackingPokemon);
    }
  }
}

module.exports = {
  Pokemon,
  Fire,
  Water,
  Grass,
  Normal,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Pokeball,
  Trainer,
  Battle,
};
