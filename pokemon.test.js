const Pokemon = require("./pokemon-class.js");
const Fire = require("./pokemon-types/fire-class.js");
const Water = require("./pokemon-types/water-class.js");
const Grass = require("./pokemon-types/grass-class.js");
const Normal = require("./pokemon-types/normal-class.js");
const Charmander = require("./pokemon-names/charmander.js");
const Squirtle = require("./pokemon-names/squirtle.js");
const Bulbasaur = require("./pokemon-names/bulbasaur.js");
const Rattata = require("./pokemon-names/rattata.js");
const Pokeball = require("./pokeball.js");
const Trainer = require("./trainer.js");
const Battle = require("./battle.js");

describe("Adding Pokemon Methods", () => {
  test("added takeDamage method", () => {
    const pokemon = new Pokemon("Eevee", 55, 18);
    pokemon.takeDamage(10);
    expect(pokemon.hitPoints).toBe(45);
  });
  test("added useMove method", () => {
    const pokemon = new Pokemon("Eevee", 55, 18);
    expect(pokemon.useMove()).toBe(18);
  });
  test("added hasFainted method results to true when hitPoints <= 0", () => {
    const pokemon = new Pokemon("Eevee", 55, 18);
    pokemon.takeDamage(60);
    expect(pokemon.hasFainted()).toBe(true);
  });
  test("added hasFainted method results to false when hitPoints > 0", () => {
    const pokemon = new Pokemon("Eevee", 55, 18);
    pokemon.takeDamage(50);
    expect(pokemon.hasFainted()).toBe(false);
  });
});

describe("Adding Pokemon Types", () => {
  test("Make a new fire object", () => {
    const firePokemon = new Fire("Flaeron", 65, 20);
    expect(firePokemon.type).toBe("fire");
  });
  test("Check that fire is not Effective to water and is weak to water", () => {
    const firePokemon = new Fire("Flaeron", 65, 20);
    const waterPokemon = new Water("Vaporeon", 70, 19);
    expect(firePokemon.isEffectiveAgainst(waterPokemon)).toBe(false);
    expect(firePokemon.isWeakTo(waterPokemon)).toBe(true);
  });
});

describe("Adding Pokemon Species", () => {
  test("Make a new Charmander object", () => {
    const charmander = new Charmander();
    expect(charmander.type).toBe("fire");
    expect(charmander.move).toBe("ember");
    expect(charmander.hitPoints).toBe(44);
    expect(charmander.name).toBe("Charmander");
    expect(charmander.attackDamage).toBe(17);
  });
  test("Make a new Rattata object", () => {
    const rattata = new Rattata(30, 10);
    expect(rattata.type).toBe("normal");
    expect(rattata.move).toBe("tackle");
    expect(rattata.hitPoints).toBe(30);
    expect(rattata.name).toBe("Rattata");
    expect(rattata.attackDamage).toBe(10);
  });
});

describe("Adding Pokeball Methods", () => {
  test("Test succesful catch", () => {
    const logSpy = jest.spyOn(console, "log");
    const charmander = new Charmander();
    const pokeball = new Pokeball();
    pokeball.throw(charmander);
    expect(pokeball.isEmpty()).toBe(false);
    expect(pokeball.storedPokemon).toEqual(charmander);
    expect(logSpy).toHaveBeenCalledWith("You caught Charmander");
  });
  test("Test succesful throw", () => {
    const logSpy = jest.spyOn(console, "log");
    const charmander = new Charmander();
    const squirtle = new Squirtle();
    const pokeball = new Pokeball();
    pokeball.throw(charmander);
    pokeball.throw();

    //OLD
    //expect(pokeball.isEmpty()).toBe(true);
    //expect(pokeball.storedPokemon).toBe(undefined);

    //NEW
    expect(pokeball.isEmpty()).toBe(false);
    expect(pokeball.throw()).toEqual(charmander);
  });

  test("Test unsuccesful catch", () => {
    const logSpy = jest.spyOn(console, "log");
    const charmander = new Charmander();
    const squirtle = new Squirtle();
    const pokeball = new Pokeball();
    pokeball.throw(charmander);
    pokeball.throw(squirtle);
    expect(logSpy).toHaveBeenCalledWith(
      "The pokeball is full, you can't catch another pokemon"
    );
  });
  test("Test unsuccesful throw", () => {
    const logSpy = jest.spyOn(console, "log");

    const pokeball = new Pokeball();
    pokeball.throw();
    expect(logSpy).toHaveBeenCalledWith("There is no Pokemon to throw");
  });
});

describe("Testing the trainer class", () => {
  test("Catching a pokemon when we have an empty ball", () => {
    const charmander = new Charmander();
    const trainer = new Trainer();
    trainer.catch(charmander);
    expect(trainer.belt[0].isEmpty()).toBe(false);
    expect(trainer.belt[1].isEmpty()).toBe(true);
  });
  test("Catching 3 pokemon when we have an empty ball", () => {
    const charmander = new Charmander();
    const squirtle = new Squirtle();
    const bulbasaur = new Bulbasaur();
    const trainer = new Trainer();
    trainer.catch(charmander);
    trainer.catch(squirtle);
    trainer.catch(bulbasaur);
    expect(trainer.belt[0].isEmpty()).toBe(false);
    expect(trainer.belt[1].isEmpty()).toBe(false);
    expect(trainer.belt[2].isEmpty()).toBe(false);
    expect(trainer.belt[3].isEmpty()).toBe(true);
  });

  test("Catching error when we don't have an empty ball", () => {
    const logSpy = jest.spyOn(console, "log");
    const charmander = new Charmander();
    const squirtle = new Squirtle();
    const bulbasaur = new Bulbasaur();
    const trainer = new Trainer();
    trainer.catch(charmander);
    trainer.catch(squirtle);
    trainer.catch(bulbasaur);
    trainer.catch(bulbasaur);
    trainer.catch(bulbasaur);
    trainer.catch(bulbasaur);
    trainer.catch(bulbasaur);
    expect(logSpy).toHaveBeenCalledWith(
      "You do not have any empty pokeballs!!"
    );
  });

  test("getPokemon function with 3 pokemon", () => {
    const charmander = new Charmander();
    const squirtle = new Squirtle();
    const trainer = new Trainer();
    //console.log(squirtle)
    trainer.catch(charmander);
    trainer.catch(squirtle);
    //console.log(trainer.belt)
    expect(trainer.getPokemon("Squirtle")).toEqual(squirtle);
  });
});

describe("Testing the battle class", () => {
  test("Checking fight() results in the correct winner", () => {
    const logSpy = jest.spyOn(console, "log");
    const squirtle = new Squirtle();
    const bulbasaur = new Bulbasaur();
    const charmander = new Charmander();

    const matt = new Trainer();
    const mya = new Trainer();

    matt.catch(squirtle);
    matt.catch(charmander);
    mya.catch(bulbasaur);

    const battle = new Battle(matt, "Squirtle", mya, "Bulbasaur");
    //expect(logSpy).toHaveBeenCalledOnceWith("Bulbasaur wins!");
  });
});
