import inquirer from "inquirer";
import { Trainer } from "./trainer.js";
import { Charmander } from "./pokemon-names/charmander.js";
import { Squirtle } from "./pokemon-names/squirtle.js";
import { Bulbasaur } from "./pokemon-names/bulbasaur.js";
import { Rattata } from "./pokemon-names/rattata.js";
import { Battle } from "./battle.js";

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

const battleQuestions: {
  type: string;
  name: string;
  message: string;
  choices: string[]; // Explicitly type choices as an array of strings
}[] = [
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
  let trainer1: Trainer;
  let trainer2: Trainer;
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

      if (!selectedPokemon) {
        throw new Error("Invalid Pokémon selection.");
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

      if (!selectedPokemon) {
        throw new Error("Invalid Pokémon selection.");
      }

      trainer2.catch(selectedPokemon);

      // Added type guard and type assertion (! basically overwrites ts, tells it i know this variable will not be null so dont worry)
      const pokemonChoices1: string[] = trainer1.belt
        .filter((ball) => !ball.isEmpty() && ball.storedPokemon !== null) // Make sure storedPokemon is not null
        .map((ball) => ball.storedPokemon!.name); // Assert that storedPokemon is not null

      const pokemonChoices2: string[] = trainer2.belt
        .filter((ball) => !ball.isEmpty() && ball.storedPokemon !== null) // Make sure storedPokemon is not null
        .map((ball) => ball.storedPokemon!.name); // Assert that storedPokemon is not null

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
