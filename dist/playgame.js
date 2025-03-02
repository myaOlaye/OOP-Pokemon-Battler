"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const trainer_js_1 = require("./trainer.js");
const charmander_js_1 = require("./pokemon-names/charmander.js");
const squirtle_js_1 = require("./pokemon-names/squirtle.js");
const bulbasaur_js_1 = require("./pokemon-names/bulbasaur.js");
const rattata_js_1 = require("./pokemon-names/rattata.js");
const battle_js_1 = require("./battle.js");
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
    inquirer_1.default
        .prompt(trainer1Questions)
        .then(function (trainer1Answers) {
        trainer1 = new trainer_js_1.Trainer(trainer1Answers.trainerName);
        let selectedPokemon;
        switch (trainer1Answers.selectedPokemon) {
            case "Charmander":
                selectedPokemon = new charmander_js_1.Charmander();
                break;
            case "Squirtle":
                selectedPokemon = new squirtle_js_1.Squirtle();
                break;
            case "Bulbasaur":
                selectedPokemon = new bulbasaur_js_1.Bulbasaur();
                break;
            case "Rattata":
                selectedPokemon = new rattata_js_1.Rattata(30, 10); // example stats
                break;
        }
        if (!selectedPokemon) {
            throw new Error("Invalid Pokémon selection.");
        }
        trainer1.catch(selectedPokemon);
        return inquirer_1.default.prompt(trainer2Questions);
    })
        .then(function (trainer2Answers) {
        trainer2 = new trainer_js_1.Trainer(trainer2Answers.trainerName);
        let selectedPokemon;
        switch (trainer2Answers.selectedPokemon) {
            case "Charmander":
                selectedPokemon = new charmander_js_1.Charmander();
                break;
            case "Squirtle":
                selectedPokemon = new squirtle_js_1.Squirtle();
                break;
            case "Bulbasaur":
                selectedPokemon = new bulbasaur_js_1.Bulbasaur();
                break;
            case "Rattata":
                selectedPokemon = new rattata_js_1.Rattata(30, 10); // example stats
                break;
        }
        if (!selectedPokemon) {
            throw new Error("Invalid Pokémon selection.");
        }
        trainer2.catch(selectedPokemon);
        // Added type guard and type assertion (! basically overwrites ts, tells it i know this variable will not be null so dont worry)
        const pokemonChoices1 = trainer1.belt
            .filter((ball) => !ball.isEmpty() && ball.storedPokemon !== null) // Make sure storedPokemon is not null
            .map((ball) => ball.storedPokemon.name); // Assert that storedPokemon is not null
        const pokemonChoices2 = trainer2.belt
            .filter((ball) => !ball.isEmpty() && ball.storedPokemon !== null) // Make sure storedPokemon is not null
            .map((ball) => ball.storedPokemon.name); // Assert that storedPokemon is not null
        battleQuestions[0].choices = pokemonChoices1;
        battleQuestions[1].choices = pokemonChoices2;
        return inquirer_1.default.prompt(battleQuestions);
    })
        .then(function (battleAnswers) {
        let battle = new battle_js_1.Battle(trainer1, battleAnswers.chosenBattlePokemon1, trainer2, battleAnswers.chosenBattlePokemon2);
        return battle.fight(battle.trainer1sPokemon, battle.trainer2sPokemon);
    });
}
playGame();
